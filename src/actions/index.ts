// src/actions/index.ts
import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  submitForm: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1),
      email: z.string().email(),
      'cf-turnstile-response': z.string().min(1, 'Please complete the CAPTCHA'),
    }),
    handler: async (input, context) => {
      // 1. Verify the Turnstile token with Cloudflare
      const verifyRes = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: import.meta.env.SECRET_KEY,
            response: input['cf-turnstile-response'],
            // Optionally pass the user's IP:
            // remoteip: context.request.headers.get('CF-Connecting-IP'),
          }),
        }
      );

      const verifyData = await verifyRes.json();

      console.log(verifyData);

      if (!verifyData.success) {
        throw new ActionError({
          code: 'FORBIDDEN',
          message: 'CAPTCHA verification failed. Please try again.',
        });
      }

      // 2. Handle your actual form logic here
      console.log('Form submitted by:', input.name, input.email);

      return { success: true };
    },
  }),
};