import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { ContactMessageInput } from '@shared/index';
import Reveal from '../components/common/Reveal';
import { useLanguage } from '../i18n/LanguageContext';
import type { Messages } from '../i18n/translations';

const INITIAL_FORM: ContactMessageInput = { name: '', email: '', message: '' };
const PORTFOLIO_EMAIL = 'mtdung240205@gmail.com';

function buildGmailComposeUrl(messages: Messages, form: ContactMessageInput): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: PORTFOLIO_EMAIL,
    su: messages.contact.gmailSubject(form.name),
    body: form.message,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

export default function Contact() {
  const { messages } = useLanguage();
  const [form, setForm] = useState<ContactMessageInput>(INITIAL_FORM);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const setField = (field: keyof ContactMessageInput, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const gmailComposeHref = useMemo(() => buildGmailComposeUrl(messages, form), [messages, form]);

  useEffect(() => {
    if (!confirmOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setConfirmOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [confirmOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    window.open(gmailComposeHref, '_blank', 'noopener,noreferrer');
    setConfirmOpen(false);
    setForm(INITIAL_FORM);
  };

  const socialLinks = [
    {
      name: messages.contact.github,
      detail: 'github.com/NembieIT',
      href: 'https://github.com/NembieIT',
      hover: 'hover:text-primary',
      glow: 'from-primary/5',
      icon: 'code',
    },
    {
      name: 'Zalo',
      detail: '0382514371',
      href: 'https://zalo.me/0382514371',
      hover: 'hover:text-secondary-fixed',
      glow: 'from-secondary-fixed/5',
      icon: 'chat',
    },
    {
      name: messages.contact.email,
      detail: 'mtdung240205@gmail.com',
      href: 'mailto:mtdung240205@gmail.com',
      hover: 'hover:text-primary-fixed',
      glow: 'from-primary-container/10',
      icon: 'mail',
    },
  ] as const;

  return (
    <div className="flex flex-col w-full">
      <section className="relative min-h-[80vh] w-full flex items-center justify-center px-margin-desktop py-stack-xl overflow-hidden">
        {/* Ambient Background Glass / Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary-fixed/10 rounded-full blur-[100px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Headline & Direct Links */}
          <div className="lg:col-span-7 flex flex-col gap-stack-md z-20">
            <Reveal className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-primary/50"></span>
                <span className="font-label-sm text-label-sm text-primary tracking-[0.2em] uppercase">
                  {messages.contact.kicker}
                </span>
              </div>
              <h1 className="font-display-xl text-display-xl text-on-surface leading-[1.1] tracking-[-0.03em]">
                {messages.contact.heading}
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                {messages.contact.description}
              </p>
            </Reveal>
            {/* Direct Social Links (Large) */}
            <Reveal delay={250}>
              <div className="mt-8 flex flex-col gap-4">
                {socialLinks.map(({ name, detail, href, hover, glow, icon }) => (
                  <a
                    key={name}
                    className={`group relative flex items-center justify-between p-6 bg-surface-container-low/40 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-500 hover:bg-surface-container hover:scale-[1.02]`}
                    href={href}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
                    <div className="relative z-10 flex items-center gap-6">
                      <span
                        className={`material-symbols-outlined text-[24px] text-outline ${hover} transition-colors duration-300`}
                      >
                        {icon}
                      </span>
                      <div className="flex flex-col gap-1 min-w-0">
                        <span
                          className={`font-headline-lg text-headline-lg text-on-surface ${hover} transition-colors duration-300`}
                        >
                          {name}
                        </span>
                        <span className="font-code-md text-code-md text-outline truncate">
                          {detail}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`relative z-10 material-symbols-outlined text-[32px] text-outline ${hover} transition-colors duration-300 transform group-hover:translate-x-2 group-hover:-translate-y-2`}
                    >
                      arrow_outward
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Contact Form */}
          <Reveal delay={200} className="lg:col-span-5 relative mt-stack-lg lg:mt-0 z-20">
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high/50 to-surface-container-low/50 backdrop-blur-2xl rounded-3xl transform rotate-1 scale-[1.03] -z-10"></div>
            <div className="bg-surface-container/60 backdrop-blur-xl p-10 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Inner Light Border */}
              <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none"></div>

              {confirmOpen ? (
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="gmail-confirm-title"
                  className="fixed inset-0 z-[100] flex items-center justify-center p-margin-desktop"
                >
                  <button
                    type="button"
                    aria-label={messages.contact.cancel}
                    onClick={() => setConfirmOpen(false)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fade-in_0.25s_ease-out]"
                  ></button>
                  <div className="relative w-full max-w-md bg-surface-container-high/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-stack-md animate-[modal-in_0.25s_ease-out]">
                    <div className="flex flex-col items-center gap-5 text-center mb-gutter">
                      <span className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[28px] text-primary">
                          forward_to_inbox
                        </span>
                      </span>
                      <h2
                        id="gmail-confirm-title"
                        className="font-headline-lg text-headline-lg text-on-surface"
                      >
                        {messages.contact.gmailConfirmTitle}
                      </h2>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                        {messages.contact.gmailConfirmText}
                      </p>
                    </div>
                    <div className="bg-surface-container rounded-xl border border-white/5 p-gutter mb-gutter max-h-40 overflow-y-auto">
                      <span className="block font-label-sm text-label-sm text-outline uppercase tracking-widest mb-2">
                        {messages.contact.messageLabel}
                      </span>
                      <p className="font-body-md text-body-md text-on-surface whitespace-pre-wrap break-words">
                        {form.message}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                      <button
                        type="button"
                        onClick={() => setConfirmOpen(false)}
                        className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant px-6 py-3 rounded-lg border border-outline-variant hover:text-on-surface hover:border-on-surface transition-colors duration-300"
                      >
                        {messages.contact.cancel}
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirm}
                        autoFocus
                        className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary to-secondary-fixed-dim p-[1px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] active:duration-100"
                      >
                        <div className="relative flex items-center justify-center gap-2 bg-transparent px-6 py-3">
                          <span className="font-label-sm text-label-sm text-on-primary tracking-[0.2em] uppercase">
                            {messages.contact.confirmOpen}
                          </span>
                          <span className="material-symbols-outlined text-[18px] text-on-primary group-hover:translate-x-1 transition-transform duration-300">
                            arrow_outward
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                  <div className="relative group">
                    <input
                      className="peer w-full bg-transparent border-b border-outline-variant py-4 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-primary transition-colors placeholder-transparent"
                      id="name"
                      placeholder={messages.contact.namePlaceholder}
                      type="text"
                      required
                      value={form.name}
                      onChange={(event) => setField('name', event.target.value)}
                    />
                    <label
                      className="absolute left-0 top-4 font-label-sm text-label-sm text-outline uppercase tracking-wider transition-all peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-top-3 peer-valid:text-[10px] peer-valid:text-primary cursor-text"
                      htmlFor="name"
                    >
                      {messages.contact.nameLabel}
                    </label>
                    <span className="absolute right-0 bottom-4 w-2 h-2 rounded-full bg-secondary-fixed opacity-0 peer-focus:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(125,244,255,0.8)]"></span>
                  </div>
                  <div className="relative group">
                    <input
                      className="peer w-full bg-transparent border-b border-outline-variant py-4 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-primary transition-colors placeholder-transparent"
                      id="email"
                      placeholder={messages.contact.emailPlaceholder}
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) => setField('email', event.target.value)}
                    />
                    <label
                      className="absolute left-0 top-4 font-label-sm text-label-sm text-outline uppercase tracking-wider transition-all peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-top-3 peer-valid:text-[10px] peer-valid:text-primary cursor-text"
                      htmlFor="email"
                    >
                      {messages.contact.emailLabel}
                    </label>
                    <span className="absolute right-0 bottom-4 w-2 h-2 rounded-full bg-secondary-fixed opacity-0 peer-focus:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(125,244,255,0.8)]"></span>
                  </div>
                  <div className="relative group mt-4">
                    <textarea
                      className="peer w-full bg-transparent border-b border-outline-variant py-4 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-primary transition-colors placeholder-transparent resize-none"
                      id="message"
                      placeholder={messages.contact.messagePlaceholder}
                      required
                      rows={4}
                      value={form.message}
                      onChange={(event) => setField('message', event.target.value)}
                    ></textarea>
                    <label
                      className="absolute left-0 top-4 font-label-sm text-label-sm text-outline uppercase tracking-wider transition-all peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-top-3 peer-valid:text-[10px] peer-valid:text-primary cursor-text"
                      htmlFor="message"
                    >
                      {messages.contact.messageLabel}
                    </label>
                  </div>

                  <button
                    className="mt-6 group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary-container p-[1px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] active:duration-100"
                    type="submit"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-surface-container-high hover:bg-transparent transition-colors duration-300 rounded-[11px] py-4 px-8 flex items-center justify-center gap-3">
                      <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                        {messages.contact.submit}
                      </span>
                      <span className="material-symbols-outlined text-[20px] text-primary group-hover:text-white transition-colors transform group-hover:translate-x-1">
                        send
                      </span>
                    </div>
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Location Section */}
      <section className="w-full px-margin-desktop py-stack-lg border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <Reveal className="flex flex-col gap-6">
            <h3 className="font-headline-md text-headline-md text-on-surface">
              {messages.footer.location}
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm">
              {messages.contact.direct}
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
                {messages.contact.localTime}
              </span>
              <HoChiMinhClock />
            </div>
          </Reveal>
          <Reveal
            delay={150}
            className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0 border border-white/10 z-20 rounded-2xl pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container via-surface-container-low to-background z-0"></div>
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] z-0"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-secondary-fixed/10 rounded-full blur-[70px] z-0"></div>
            <div
              role="img"
              aria-label="Cần Thơ, Vietnam — the Mekong Delta city."
              className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6 text-center"
            >
              <span className="font-display-lg text-display-lg text-on-surface leading-none">
                Cần Thơ
              </span>
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-[0.3em]">
                Vietnam · 10.0452° N, 105.7469° E
              </span>
              <div className="flex items-center gap-2 bg-surface-container-high/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="font-label-sm text-label-sm text-on-surface">ICT · UTC+7</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function HoChiMinhClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const time = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return <span className="font-code-md text-code-md text-primary">{time} ICT</span>;
}
