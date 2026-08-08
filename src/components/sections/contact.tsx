"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useRef } from "react";
import { useSiteSettings } from "@/lib/site-settings";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: "GitHub", href: "https://github.com/lchenrique", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lc-henrique", icon: Linkedin },
  { label: "Email", href: "mailto:lc.henriquee@gmail.com", icon: Mail },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useSiteSettings();

  useGSAP(() => {
    const root = sectionRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(q(".contact-kicker, .contact-footer"), { y: 32, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out",
      scrollTrigger: { trigger: root, start: "top 72%" },
    });
    gsap.fromTo(q(".contact-line"), { yPercent: 120, rotate: 3 }, {
      yPercent: 0,
      rotate: 0,
      duration: 1.25,
      stagger: 0.09,
      ease: "power4.out",
      scrollTrigger: { trigger: root, start: "top 68%" },
    });
    gsap.to(q(".contact-sun"), {
      rotation: 360,
      scale: 1.06,
      duration: 18,
      repeat: -1,
      ease: "none",
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

        <div className="contact-heading">
          <span className="line-mask"><span className="contact-line">{t("contactTitleOne")}</span></span>
          <span className="line-mask"><span className="contact-line contact-heading__muted">{t("contactTitleTwo")}</span></span>
          <span className="line-mask"><span className="contact-line">{t("contactTitleThree")}</span></span>
        </div>

        <a className="contact-email" href="mailto:lc.henriquee@gmail.com">
          <span>lc.henriquee@gmail.com</span>
          <ArrowUpRight size={28} />
        </a>

        <div className="contact-footer">
          <div className="social-links">
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <Icon size={16} />{label}<ArrowUpRight className="social-links__arrow" size={14} />
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
