"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useRef } from "react";
import { useSiteSettings } from "@/lib/site-settings";

const socials = [
  { label: "GitHub", href: "https://github.com/lchenrique", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lc-henrique", icon: Linkedin },
  { label: "Email", href: "mailto:carlos@codebycarlos.dev", icon: Mail },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useSiteSettings();

  useGSAP(() => {
    const root = sectionRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(q(".contact-kicker, .contact-line, .contact-email, .contact-footer"), {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        rotate: 0,
      });
      return;
    }

    gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 72%", once: true },
      defaults: { ease: "power4.out" },
    })
      .fromTo(q(".contact-kicker"), { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 })
      .fromTo(q(".contact-line"), { yPercent: 120, rotate: 3 }, {
        yPercent: 0,
        rotate: 0,
        duration: 1.2,
        stagger: 0.08,
      }, 0.08)
      .fromTo(q(".contact-email, .contact-footer"), { y: 30, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }, 0.42);
    gsap.to(q(".contact-sun"), {
      rotation: 360,
      scale: 1.06,
      duration: 18,
      repeat: -1,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contact" className="contact-section section-acid">
      <div className="contact-sun" aria-hidden="true"><span>{t("contactSunOne")}<br />{t("contactSunTwo")}</span></div>
      <div className="page-gutter contact-content">
        <div className="section-marker section-marker--dark contact-kicker">
          <span>05 / {t("contact")}</span>
          <span className="section-marker__rule" />
          <span>{t("contactSub")}</span>
        </div>

        <h2 className="contact-heading">
          <span className="line-mask"><span className="contact-line">{t("contactTitleOne")}</span></span>
          <span className="line-mask"><span className="contact-line contact-heading__muted">{t("contactTitleTwo")}</span></span>
          <span className="line-mask"><span className="contact-line">{t("contactTitleThree")}</span></span>
        </h2>

        <a className="contact-email" href="mailto:carlos@codebycarlos.dev">
          <span>carlos@codebycarlos.dev</span>
          <ArrowUpRight size={28} />
        </a>

        <div className="contact-footer">
          <div className="social-links">
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <Icon size={16} />{label === "Email" ? t("emailLabel") : label}<ArrowUpRight className="social-links__arrow" size={14} />
              </a>
            ))}
          </div>
          <div className="contact-footer__meta">
            <span><i className="status-dot" /> {t("current")}</span>
            <span>© {new Date().getFullYear()} Carlos Henrique</span>
          </div>
        </div>
      </div>
    </section>
  );
}
