export interface NavLink {
  title: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  links: NavLink[];
}

export interface NavItem extends NavLink {
  /** Show in the mega menu */
  megaColumns?: MegaMenuColumn[];
  /** Accent styling (e.g. تخفیف‌ها) */
  highlight?: boolean;
}
