import { Resend } from 'resend'

export const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);