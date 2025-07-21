This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

This project requires the following environment variables to be set:

1. Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update the values in `.env.local`:
- `NEXT_PUBLIC_API_URL`: The URL of your WordPress API endpoint (e.g., `https://your-wordpress-site.com/wp-json`)
- `DATABASE_URL`: Your database connection string for Prisma

**Important for Vercel deployment**: Make sure to set these environment variables in your Vercel project settings.

## Troubleshooting Deploy Issues

### Common Build Errors:

1. **"options hash must contain an API endpoint URL string"**
   - Cause: `NEXT_PUBLIC_API_URL` not set in Vercel environment variables
   - Solution: Add the environment variable in Vercel dashboard

2. **"Cannot read properties of undefined (reading 'slug')"**
   - Cause: Components trying to access properties of undefined posts/data
   - Solution: The code now includes proper error handling and fallbacks

3. **"Internal Server Error" on /api/banners**
   - Cause: Database connection issues (DATABASE_URL not set or invalid)
   - Solution: Ensure DATABASE_URL is properly configured in Vercel

### Database Setup:
If you're using a database, make sure to:
1. Set up your database (PostgreSQL recommended)
2. Configure `DATABASE_URL` in environment variables
3. Run Prisma migrations if needed

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
