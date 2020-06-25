Assumptions:

- User can pick from a category on the main page -> go into any category page -> go into recipe page.
- Ensure proper keyboard a11y for traversing -- just need good semantics here with links (static generation helps here)
- Allow user to go back at any time
- Ensure that we have some basic SEO and good-enough performance.
- Statically-generate everything possible to optimize for quick page loads.

## Future Enhancements

- Run data through a sort function in getStaticProps to allow for alphabetical sorting
- Use some kind of memoized fetch util to not murder the poor API
- Print media query on the recipe page would be nice
- Create a custom next.js document to prevent flash of unstyled content
- Could be fun to add little check marks on each recipe step.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
