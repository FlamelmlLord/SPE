
'use client';

import { UserMenu } from './user-menu';

interface HeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function Header({ title, breadcrumbs }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center">
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="hover:text-gray-900 transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-gray-900">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="mx-2">/</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1
            className="text-2xl font-bold"
            style={{ color: '#01033e' }}
          >
            {title}
          </h1>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}