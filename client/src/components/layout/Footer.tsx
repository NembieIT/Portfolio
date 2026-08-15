import { useLanguage } from '../../i18n/LanguageContext';

export default function Footer() {
  const { messages } = useLanguage();

  const links = [
    { label: messages.contact.github, href: 'https://github.com/NembieIT', external: true },
    { label: 'Zalo', href: 'https://zalo.me/0382514371', external: true },
    { label: 'Email', href: 'mailto:mtdung240205@gmail.com', external: false },
  ];

  return (
    <footer className="w-full bg-surface-container-lowest pt-stack-xl pb-stack-md px-margin-desktop">
      <div className="max-w-container-max mx-auto border-t border-outline-variant pt-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
          <div className="space-y-gutter">
            <h2 className="font-display-lg text-display-lg text-on-surface leading-none">
              {messages.footer.heading}
              <br />
              <span className="italic text-primary">{messages.footer.headingAccent}</span>
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              {messages.footer.location}
            </p>
          </div>
          <div className="flex flex-col justify-end items-start md:items-end space-y-8">
            <div className="flex gap-8">
              {links.map(({ label, href, external }) => (
                <a
                  key={label}
                  className="font-label-sm text-label-sm uppercase text-on-surface hover:text-primary transition-colors"
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="font-label-sm text-label-sm text-outline">
              © 2026 MAI TIẾN DŨNG. {messages.footer.rights.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
