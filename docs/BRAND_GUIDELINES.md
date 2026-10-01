\# Brand Guidelines — Fashion E-Commerce



\## Project



Build a modern Persian RTL e-commerce website focused on:



\* Clothing

\* Fashion

\* Shoes

\* Bags

\* Accessories

\* Beauty and lifestyle products



The website should feel like a professional, large-scale Iranian e-commerce platform.



\---



\# Technology



Use:



\* Next.js

\* TypeScript

\* Tailwind CSS

\* shadcn/ui

\* IRANSans

\* RTL layout



The entire interface must be designed for RTL.



\---



\# Visual References



Use the following websites as \*\*visual and UX references\*\*:



\### Reference 1 — Digikala



https://www.digikala.com/



Take inspiration from:



\* E-commerce information architecture

\* Header structure

\* Search experience

\* Category navigation

\* Product listing

\* Product cards

\* Filtering

\* Sorting

\* Shopping cart experience

\* General e-commerce UX patterns



\---



\### Reference 2 — Khanoumi



https://www.khanoumi.com/



Take inspiration from:



\* Fashion and beauty-oriented visual presentation

\* Product discovery

\* Category presentation

\* Promotional sections

\* Product cards

\* Product detail presentation

\* Clean commercial UI

\* Visual merchandising



\---



\### Reference 3 — Digistyle



https://www.digistyle.com/



Take inspiration from:



\* Fashion e-commerce visual direction

\* Clothing product presentation

\* Product photography

\* Product grids

\* Fashion category structure

\* Product detail experience

\* Promotional banners

\* Premium fashion-oriented layout



\---



\# Important Reference Rule



Combine useful ideas from all three references.



The final website should NOT be a copy of any of them.



Do not copy:



\* Exact layouts

\* Exact component designs

\* Exact branding

\* Logos

\* Images

\* Text

\* Proprietary assets

\* Exact visual identity



Create an original visual identity based on the general UX and design principles of these references.



The goal is:



\*\*Digikala's e-commerce usability + Khanoumi's commercial/fashion presentation + Digistyle's fashion-oriented visual direction\*\*



Create a unified and original design.



\---



\# Brand Personality



The brand should feel:



\* Modern

\* Professional

\* Stylish

\* Trustworthy

\* Premium

\* Clean

\* Friendly

\* Fashion-focused



Avoid making the interface:



\* Too colorful

\* Too playful

\* Too crowded

\* Too corporate

\* Visually outdated



\---



\# Design Direction



Use:



\* Clean layouts

\* Strong visual hierarchy

\* High-quality product imagery

\* Spacious sections

\* Clear typography

\* Consistent spacing

\* Professional product cards

\* Large product photography

\* Subtle borders

\* Subtle shadows

\* Consistent border radius

\* Clear CTA buttons



The design should prioritize product discovery and shopping usability.



\---



\# RTL



The entire application must be RTL.



Use:



```html

<html dir="rtl">

```



and ensure that:



\* Navigation is RTL

\* Product grids work correctly in RTL

\* Forms are RTL

\* Breadcrumbs are RTL

\* Dashboard is RTL

\* Filters are RTL

\* Dropdowns are RTL

\* Modals are RTL

\* Cart is RTL

\* Checkout is RTL

\* Text alignment follows RTL conventions



Use CSS logical properties where appropriate.



Avoid hard-coded left/right positioning when logical properties can be used.



Prefer:



\* `margin-inline`

\* `padding-inline`

\* `inset-inline`

\* `border-inline`

\* `text-align: start/end`



\---



\# Typography



Primary font:



\*\*IRANSans\*\*



Use IRANSans consistently across the application.



Typography should have a clear hierarchy:



\* Display

\* H1

\* H2

\* H3

\* Body

\* Caption

\* Label

\* Price

\* Button



Do not use excessive font sizes or font weights.



\---



\# Color System



Create a consistent color system.



Use a clean fashion-oriented palette.



Primary:



```text

Define based on the final brand identity.

```



Secondary:



```text

Define based on the final brand identity.

```



Background:



```text

White / neutral

```



Surface:



```text

Neutral

```



Text:



```text

Dark neutral

```



Muted text:



```text

Neutral gray

```



Border:



```text

Light neutral

```



Success:



```text

Green

```



Warning:



```text

Amber

```



Error:



```text

Red

```



Do not use random colors across different pages.



All colors must belong to a consistent design system.



\---



\# Product Imagery



Product images are a major part of the visual identity.



Use:



\* Large product images

\* Consistent image ratios

\* Clean backgrounds

\* High-quality fashion photography

\* Consistent product presentation



Product cards should give visual priority to the product.



Do not overload product cards with unnecessary information.



\---



\# Product Card



Product cards should include where appropriate:



\* Product image

\* Brand

\* Product name

\* Current price

\* Previous price

\* Discount

\* Rating

\* Wishlist button

\* Product badge



The card should remain visually clean.



Avoid showing every possible piece of information at once.



\---



\# Navigation



Create a professional e-commerce navigation system.



Desktop:



\* Logo

\* Main categories

\* Search

\* Account

\* Wishlist

\* Cart



Support category navigation and mega menus where appropriate.



Mobile:



\* Compact header

\* Search

\* Menu

\* Cart

\* Account



The navigation should remain easy to use on small screens.



\---



\# Homepage Visual Direction



The homepage should combine:



\### E-commerce



Inspired by Digikala:



\* Strong search

\* Category discovery

\* Product discovery

\* Promotional sections

\* Best sellers

\* New products



\### Fashion



Inspired by Digistyle and Khanoumi:



\* Fashion banners

\* Editorial-style sections

\* Large product imagery

\* Curated collections

\* Seasonal collections

\* Category storytelling



Do not make the homepage feel like a generic marketplace.



It should clearly feel like a \*\*fashion e-commerce platform\*\*.



\---



\# Product Details Visual Direction



Product pages should prioritize:



1\. Product photography

2\. Product name

3\. Price

4\. Variants

5\. Purchase actions

6\. Product information

7\. Reviews

8\. Related products



Use a clean fashion-commerce layout.



Product images should receive strong visual emphasis.



\---



\# Dashboard Visual Direction



The customer dashboard should use the same design system as the main website.



Include:



\* Overview

\* Orders

\* Order details

\* Wishlist

\* Profile

\* Addresses

\* Payment methods

\* Notifications

\* Settings



The dashboard should feel like part of the same product, not a separate application.



\---



\# Responsive Design



Design mobile-first.



Support:



\* Mobile

\* Tablet

\* Desktop

\* Large desktop



The desktop design must not simply be scaled down for mobile.



Create appropriate mobile layouts for:



\* Navigation

\* Product grids

\* Filters

\* Product details

\* Cart

\* Checkout

\* Dashboard



\---



\# Components



Use reusable components.



Use shadcn/ui components where appropriate.



Examples:



\* Button

\* Input

\* Select

\* Dialog

\* Sheet

\* Dropdown

\* Tabs

\* Accordion

\* Checkbox

\* Radio

\* Switch

\* Tooltip

\* Toast

\* Skeleton



Customize them to match the brand design.



Do not make the website look like the default shadcn/ui theme.



shadcn/ui is a component foundation, not the final visual identity.



\---



\# Design Consistency



All pages must feel like one product.



Maintain consistency in:



\* Typography

\* Colors

\* Spacing

\* Border radius

\* Shadows

\* Buttons

\* Forms

\* Cards

\* Icons

\* Product imagery

\* Navigation

\* Responsive behavior



Do not create each page as an independent design.



\---



\# Originality



The reference websites are inspiration only.



The final result must have its own:



\* Brand identity

\* Color system

\* Component styling

\* Layout decisions

\* Typography hierarchy

\* Visual language



Do not reproduce any reference website pixel-for-pixel.



\---



\# Technical UI Requirements



Use:



\* Next.js

\* TypeScript

\* Tailwind CSS

\* shadcn/ui

\* IRANSans

\* RTL



Use semantic HTML.



Follow accessibility best practices.



Follow frontend SEO best practices.



Keep the architecture ready for future integration with:



\* Backend

\* API

\* Authentication

\* Database

\* Payment

\* Product management



However, do NOT implement those systems as part of this UI generation.



The current scope is:



\*\*UI + responsive design + accessibility + semantic HTML + frontend SEO structure.\*\*



\# Theme System



The website must support two complete visual themes:



\* Light Mode

\* Dark Mode



Both themes must be designed intentionally and must feel like the same brand.



Do not create Dark Mode by simply inverting the Light Mode colors.



\---



\## Light Mode



Light Mode is the default theme.



Use:



\* Light page backgrounds

\* White or near-white surfaces

\* Dark readable text

\* Subtle borders

\* Subtle shadows

\* Clear product imagery

\* Strong visual hierarchy



The Light Mode should feel:



\* Clean

\* Modern

\* Premium

\* Professional

\* Spacious



\---



\## Dark Mode



Dark Mode must be a fully designed theme.



Use:



\* Dark page backgrounds

\* Dark surface colors

\* High-contrast text

\* Subtle borders

\* Controlled shadows

\* Appropriate muted colors

\* Clear separation between cards and page background



The Dark Mode should feel:



\* Premium

\* Modern

\* Elegant

\* Comfortable for long use



Do not use pure black everywhere.



Prefer a layered dark color system such as:



```text

Background

Surface

Surface Elevated

Border

Primary Text

Secondary Text

Muted Text

```



\---



\## Color Tokens



Do not hard-code colors separately inside individual components.



Use theme-aware design tokens.



Example:



```text

background

foreground



card

card-foreground



popover

popover-foreground



primary

primary-foreground



secondary

secondary-foreground



muted

muted-foreground



accent

accent-foreground



destructive

destructive-foreground



border

input

ring

```



Each token must have appropriate values for both:



```text

Light Mode

Dark Mode

```



\---



\## Components



Every reusable component must work correctly in both themes.



Test and design both themes for:



\* Header

\* Navbar

\* Mega Menu

\* Search

\* Product Card

\* Product Details

\* Buttons

\* Inputs

\* Selects

\* Dropdowns

\* Dialogs

\* Drawers

\* Tabs

\* Accordions

\* Tables

\* Dashboard

\* Cart

\* Checkout

\* Toasts

\* Alerts

\* Empty States

\* Error States

\* Loading States

\* Footer



\---



\## Product Images



Do not apply filters that reduce product image quality in Dark Mode.



Product images must remain visually accurate.



Use appropriate image backgrounds or containers when required to maintain product visibility in both themes.



\---



\## Theme Switcher



Add a theme switcher to the application.



Support:



\* Light

\* Dark

\* System



The UI should clearly communicate the current theme.



The theme switcher should be accessible and keyboard-friendly.



\---



\## Persistence



The selected theme should persist across navigation.



If the technology stack supports it, use the standard theme-management approach for the framework.



Avoid visible theme flashing during initial page load where possible.



\---



\## RTL



Theme switching must not affect RTL behavior.



Both themes must support the complete RTL layout correctly.



\---



\## Design Rule



Light Mode and Dark Mode must share:



\* Brand identity

\* Typography

\* Spacing

\* Components

\* Layout

\* Brand colors



Only the visual theme tokens should change.



Do not create two completely different designs.



The result should feel like:



\*\*One brand with two professional themes.\*\*



