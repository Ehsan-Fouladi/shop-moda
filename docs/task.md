You are working on an existing e-commerce frontend.



Your task is ONLY to audit and fix the COLOR SYSTEM and THEME.



IMPORTANT:



\* Do NOT redesign the website.

\* Do NOT change the visual identity.

\* Do NOT modify layout, spacing, typography, or responsive behavior.

\* Preserve the existing design direction.

\* Read and follow `UI\_SPEC.md` and `BRAND\_GUIDELINES.md`.

\* These files are the source of truth.



First inspect the entire frontend.



Audit:



\* Page background colors

\* Surface/card colors

\* Primary text colors

\* Secondary text colors

\* Muted text colors

\* Border colors

\* Primary action colors

\* Secondary action colors

\* Link colors

\* Success colors

\* Warning colors

\* Error colors

\* Hover states

\* Focus states

\* Active states

\* Disabled states

\* Input colors

\* Placeholder colors

\* Modal/dropdown colors

\* Any other UI colors



Also find:



\* Hard-coded colors

\* Duplicate colors

\* Inconsistent colors used for the same purpose

\* Colors that conflict with the brand guidelines

\* Poor text/background contrast



IMPORTANT:

Do not simply replace colors based on personal preference.



First understand the existing design and the brand guidelines.



If the project does not have a proper centralized color system, create a semantic color-token system that fits the existing design.



For example:



\--color-background

\--color-foreground

\--color-muted

\--color-border

\--color-primary

\--color-primary-foreground

\--color-secondary

\--color-secondary-foreground

\--color-success

\--color-warning

\--color-danger



Use the project's existing styling architecture. If Tailwind is used, integrate the tokens correctly into the existing Tailwind setup instead of creating an unrelated CSS system.



Before making changes:



1\. Audit the project.

2\. Identify all color problems.

3\. Identify their root causes.

4\. Report the planned changes.



Then implement the fixes.



After implementation:



\* Search again for remaining inconsistent hard-coded colors.

\* Verify all major pages.

\* Verify reusable components.

\* Verify hover/focus/disabled states.

\* Verify contrast.

\* Run lint/build/tests if available.



Do not touch spacing, typography, layout, or responsive behavior.



The goal is to make the existing color system consistent and maintainable, NOT to redesign the website.



You are working on an existing e-commerce frontend.



Your task is ONLY to audit and fix TYPOGRAPHY.



IMPORTANT:



\* Do NOT redesign the website.

\* Do NOT change the visual identity.

\* Do NOT modify colors, spacing, layout, or responsive behavior unless a typography fix absolutely requires it.

\* Read and follow `UI\_SPEC.md` and `BRAND\_GUIDELINES.md`.

\* These files are the source of truth.



Audit the entire application.



Check:



\* Font family

\* Font loading

\* Font weights

\* Heading hierarchy

\* H1

\* H2

\* H3

\* H4

\* Body text

\* Small text

\* Captions

\* Labels

\* Buttons

\* Navigation text

\* Form text

\* Placeholder text

\* Price typography

\* Product titles

\* Product descriptions

\* Error messages

\* Success messages

\* Line height

\* Letter spacing

\* Text wrapping

\* Text truncation

\* Font size consistency



Find:



\* Incorrect font usage

\* Inconsistent font sizes

\* Incorrect font weights

\* Incorrect line heights

\* Duplicate or unnecessary typography values

\* Components that use different typography for the same semantic role

\* Typography that breaks the intended hierarchy



Do not make arbitrary typography decisions.



Use `UI\_SPEC.md` and `BRAND\_GUIDELINES.md` as the source of truth.



If the project does not have a consistent typography system, create a small semantic typography scale that matches the existing design.



Before modifying code:



1\. Audit the complete project.

2\. Identify typography inconsistencies.

3\. Identify root causes.

4\. Report the planned corrections.



Then implement the fixes.



After implementation:



\* Search for inconsistent typography values again.

\* Verify all major pages.

\* Verify reusable components.

\* Verify text wrapping.

\* Verify headings and body text.

\* Run lint/build/tests if available.



Do not redesign the UI.



The goal is to make typography consistent with the existing design system.



You are working on an existing e-commerce frontend.



Your task is ONLY to audit and fix SPACING and LAYOUT CONSISTENCY.



IMPORTANT:



\* Do NOT redesign the website.

\* Do NOT change the visual identity.

\* Do NOT change the color system.

\* Do NOT change typography unless required by a spacing dependency.

\* Do NOT change responsive behavior yet.

\* Read and follow `UI\_SPEC.md` and `BRAND\_GUIDELINES.md`.



Audit the entire application.



Check:



PAGE SPACING:



\* Page padding

\* Container padding

\* Header-to-content spacing

\* Section-to-section spacing

\* Section padding

\* Content width

\* Vertical rhythm



COMPONENT SPACING:



\* Card padding

\* Card-to-card spacing

\* Button padding

\* Input padding

\* Form field spacing

\* Label-to-input spacing

\* Icon-to-text spacing

\* Image-to-text spacing



LAYOUT:



\* Grid gaps

\* Flex gaps

\* Row gaps

\* Column gaps

\* Margins

\* Padding

\* Alignment

\* Container widths

\* Component positioning



TYPOGRAPHY-RELATED SPACING:



\* Heading-to-content spacing

\* Heading-to-paragraph spacing

\* Paragraph spacing

\* Text block spacing



NAVIGATION:



\* Header spacing

\* Navigation item spacing

\* Dropdown spacing

\* Mobile navigation spacing



SPECIAL UI:



\* Modals

\* Dialogs

\* Forms

\* Empty states

\* Loading states

\* Error states



Find inconsistent spacing across similar components and pages.



IMPORTANT:

Do not fix problems by adding random one-off margins.



Find the ROOT CAUSE.



First inspect whether the project already has:



\* Tailwind spacing utilities

\* CSS variables

\* Design tokens

\* Spacing scale

\* Reusable layout components

\* Container components



If a spacing system already exists, use it consistently.



If no consistent system exists, create a small spacing system based on the existing UI and `UI\_SPEC.md`.



Before modifying code:



1\. Audit the project.

2\. Identify spacing inconsistencies.

3\. Identify root causes.

4\. Report the planned changes.



Then implement the fixes.



After implementation:



\* Search again for inconsistent spacing values.

\* Verify major pages.

\* Verify reusable components.

\* Verify desktop layouts.

\* Make sure the fixes do not introduce new layout problems.

\* Run lint/build/tests if available.



Do not redesign components.



The goal is to make the existing spacing and layout system consistent and maintainable.



You are working on an existing e-commerce frontend.



Your task is ONLY to audit and fix RESPONSIVE BEHAVIOR.



IMPORTANT:



\* Do NOT redesign the website.

\* Do NOT change the visual identity.

\* Preserve the existing UI.

\* Read and follow `UI\_SPEC.md` and `BRAND\_GUIDELINES.md`.

\* Do not make unnecessary changes to colors, typography, or spacing.



Audit EVERY page and reusable component.



Test the interface at these viewport widths:



\* 320px

\* 375px

\* 390px

\* 414px

\* 768px

\* 1024px

\* 1280px

\* 1440px



Check:



\* Horizontal overflow

\* Broken layouts

\* Fixed-width elements

\* Grid behavior

\* Flex behavior

\* Container behavior

\* Navigation

\* Mobile navigation

\* Header

\* Footer

\* Product cards

\* Product grids

\* Images

\* Buttons

\* Forms

\* Inputs

\* Tables

\* Modals

\* Dropdowns

\* Search

\* Filters

\* Cart

\* Checkout

\* Text wrapping

\* Text truncation

\* Touch targets

\* Breakpoints

\* Visibility rules

\* Alignment

\* Spacing behavior



Find the ROOT CAUSE of each responsive problem.



Do NOT solve problems by adding random media-query overrides.



Do NOT create one-off hacks such as arbitrary widths or excessive breakpoint rules.



First inspect the existing responsive architecture:



\* Tailwind breakpoints

\* CSS media queries

\* Container system

\* Grid system

\* Flex layouts

\* min-width / max-width rules

\* fixed widths

\* overflow rules



Before modifying code:



1\. Audit every page.

2\. Identify responsive problems.

3\. Identify the root cause.

4\. Report the planned corrections.



Then implement the fixes.



After implementation:



\* Re-test all specified viewport widths.

\* Check for horizontal overflow.

\* Check mobile, tablet, and desktop.

\* Verify that fixing one breakpoint did not break another.

\* Run lint/build/tests if available.



Do not redesign the website.



The goal is to make the existing design work correctly across different viewport sizes.



