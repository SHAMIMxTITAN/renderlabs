import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, Instagram, ArrowRight, Loader2 } from "lucide-react";
import { CONTACT } from "@/data/content";
import { Reveal } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent — we'll be in touch shortly.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full h-12 rounded-xl bg-[#f7f7f7] border border-[#e5e7eb] px-4 text-[#111111] placeholder:text-[#9ca3af] outline-none transition-all focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] focus:bg-white";

  return (
    <section id="contact" data-testid="contact" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <Reveal>
          <p className="text-sm font-medium tracking-wide uppercase text-[#9ca3af] mb-5">
            Contact
          </p>
          <h2 className="font-display font-extrabold tracking-[-0.04em] text-[#111111] text-5xl md:text-7xl leading-[0.95]">
            Let's make
            <br />
            something
            <br />
            <span className="text-[#2563eb]">great.</span>
          </h2>

          <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-[#e5e7eb] bg-[#f7f7f7] px-4 py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium text-[#111111]">
              Currently taking new projects
            </span>
          </div>

          <div className="mt-10 space-y-1 border-t border-[#e5e7eb] pt-8">
            <div className="py-3" data-testid="contact-name">
              <div className="text-xs uppercase tracking-wide text-[#9ca3af]">Studio lead</div>
              <div className="text-[#111111] font-medium">{CONTACT.name}</div>
            </div>
            <a
              href={`mailto:${CONTACT.email}`}
              data-testid="contact-email"
              className="flex items-center gap-3 py-3 text-[#111111] hover:text-[#2563eb] transition-colors group"
            >
              <Mail size={18} className="text-[#2563eb]" />
              <span className="font-medium">{CONTACT.email}</span>
              <ArrowRight size={15} className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </a>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              data-testid="contact-phone"
              className="flex items-center gap-3 py-3 text-[#111111] hover:text-[#2563eb] transition-colors group"
            >
              <Phone size={18} className="text-[#2563eb]" />
              <span className="font-medium">{CONTACT.phone}</span>
              <ArrowRight size={15} className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-instagram"
              className="flex items-center gap-3 py-3 text-[#111111] hover:text-[#2563eb] transition-colors group"
            >
              <Instagram size={18} className="text-[#2563eb]" />
              <span className="font-medium">@renderlabhq</span>
              <ArrowRight size={15} className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            data-testid="contact-form"
            onSubmit={submit}
            className="rounded-2xl border border-[#eceef0] bg-[#fbfbfb] p-7 md:p-9"
          >
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-2">Name</label>
                <input
                  data-testid="contact-input-name"
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Your name"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-2">Email</label>
                <input
                  data-testid="contact-input-email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@company.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-2">Message</label>
                <textarea
                  data-testid="contact-input-message"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us about your project…"
                  rows={5}
                  className={`${inputCls} h-auto py-3 resize-none`}
                />
              </div>
              <button
                data-testid="contact-submit"
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium px-6 py-3.5 transition-all hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
