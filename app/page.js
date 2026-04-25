"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Stars,
  Compass,
  Heart,
  Briefcase,
  ArrowRight,
  UserRound,
  Flame,
  Mountain,
  Waves,
  Leaf,
  Gem,
  Sun,
  Moon,
  MessageCircle,
  Zap,
  CircleDot
} from "lucide-react";

import {
  createBaziProfile,
  fiveElements,
  generatingCycle,
  controllingCycle,
  getColorClass
} from "./lib/bazi";

const elementIcons = {
  Wood: <Leaf size={18} />,
  Fire: <Flame size={18} />,
  Earth: <Mountain size={18} />,
  Metal: <Gem size={18} />,
  Water: <Waves size={18} />
};

const westernSigns = [
  { sign: "Aries", element: "Fire", symbol: "♈" },
  { sign: "Taurus", element: "Earth", symbol: "♉" },
  { sign: "Gemini", element: "Air", symbol: "♊" },
  { sign: "Cancer", element: "Water", symbol: "♋" },
  { sign: "Leo", element: "Fire", symbol: "♌" },
  { sign: "Virgo", element: "Earth", symbol: "♍" },
  { sign: "Libra", element: "Air", symbol: "♎" },
  { sign: "Scorpio", element: "Water", symbol: "♏" },
  { sign: "Sagittarius", element: "Fire", symbol: "♐" },
  { sign: "Capricorn", element: "Earth", symbol: "♑" },
  { sign: "Aquarius", element: "Air", symbol: "♒" },
  { sign: "Pisces", element: "Water", symbol: "♓" }
];

const planetIcons = {
  Sun: <Sun size={18} />,
  Moon: <Moon size={18} />,
  Mercury: <MessageCircle size={18} />,
  Venus: <Heart size={18} />,
  Mars: <Zap size={18} />,
  Jupiter: <CircleDot size={18} />,
  Saturn: <CircleDot size={18} />,
  Uranus: <CircleDot size={18} />,
  Neptune: <CircleDot size={18} />,
  Pluto: <CircleDot size={18} />
};

function createStars() {
  return Array.from({ length: 70 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`
  }));
}

const stars = createStars();

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    birthDate: "",
    birthTime: "",
    birthCity: ""
  });

  const [profile, setProfile] = useState(null);
  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate(e) {
    e.preventDefault();
    if (!form.birthDate) return;

    setLoading(true);
    setReading("");
    setError("");

    try {
        let location = null;

        if (form.birthCity) {
          const locationRes = await fetch("/api/location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city: form.birthCity })
          });

          if (locationRes.ok) {
            location = await locationRes.json();
          }
        }

        const bazi = createBaziProfile(form.birthDate, form.birthTime, location);

      const astrologyRes = await fetch("/api/astrology", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          birthDate: form.birthDate,
          birthTime: form.birthTime || "12:00",
          birthCity: form.birthCity,
          location
        })
      });

      if (!astrologyRes.ok) {
        throw new Error("Astrology calculation failed.");
      }

      const astrology = await astrologyRes.json();

      const newProfile = {
        chineseZodiac: bazi.eightChars[0].branch.animal,
        location,
        ...bazi,
        ...astrology
      };

      setProfile(newProfile);

      const readingRes = await fetch("/api/reading", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          ...newProfile
        })
      });

      const data = await readingRes.json();
      setReading(data.reading);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while generating your chart.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030817] px-6 py-8 text-white">
      <div className="orb left-[-120px] top-[-120px] h-96 w-96 bg-purple-700" />
      <div className="orb right-[-140px] top-[20%] h-96 w-96 bg-blue-700" />
      <div className="orb bottom-[-160px] left-[35%] h-96 w-96 bg-indigo-700" />

      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-purple-400/30 pb-5">
        <div className="flex items-center gap-2 font-serif text-2xl">
          ZodiaScope AI
          <Sparkles className="text-purple-300" />
        </div>

        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#about">About</a>
          <a href="#start">Reading</a>
          <a
            href="#start"
            className="rounded-full border border-purple-400/60 px-6 py-2 text-white shadow-[0_0_25px_rgba(168,85,247,0.45)]"
          >
            Start →
          </a>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 py-20 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
            <Stars size={16} />
            BaZi Eight Characters × Real Planetary Signs × AI
          </p>

          <h1 className="font-serif text-5xl leading-tight text-glow md:text-7xl">
            Decode your destiny through birth time.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            A dual-core self-discovery platform combining Chinese BaZi and Western
            astrology into one integrated cosmic profile.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#start"
              className="rounded-full bg-purple-500 px-7 py-3 font-medium shadow-[0_0_35px_rgba(168,85,247,0.65)] transition hover:bg-purple-400"
            >
              Start Your Reading
            </a>

            <a
              href="#about"
              className="rounded-full border border-white/20 px-7 py-3 text-white/80 transition hover:border-purple-300"
            >
              How it works
            </a>
          </div>
        </motion.div>

        <motion.div
          className="glass relative rounded-[2rem] p-8"
          initial={{ opacity: 0, rotate: 3, y: 30 }}
          animate={{ opacity: 1, rotate: 0, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <ZodiacWheel />

          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-sm">
            <MiniCard title="BaZi" value="Eight Characters" />
            <MiniCard title="Astrology" value="Planet Signs" />
            <MiniCard title="AI" value="Fusion" />
          </div>
        </motion.div>
      </section>

      <section id="about" className="relative z-10 mx-auto max-w-7xl py-10">
        <h2 className="mb-8 font-serif text-4xl">How it works</h2>

        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<Calendar />}
            title="Birth Data"
            text="Enter birth date, time, city, and gender to build a dual-system profile."
          />
          <FeatureCard
            icon={<Compass />}
            title="BaZi System"
            text="Generate Eight Characters, Yin-Yang Five Elements, Chinese Zodiac, and Day Master strength."
          />
          <FeatureCard
            icon={<Stars />}
            title="Astrology System"
            text="Calculate real planetary zodiac signs using an astronomy engine, then explain each placement."
          />
        </div>
      </section>

      <section
        id="start"
        className="relative z-10 mx-auto grid max-w-7xl gap-8 py-20 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <form onSubmit={handleGenerate} className="glass rounded-[2rem] p-8">
          <h2 className="mb-2 font-serif text-4xl">Start your fusion reading</h2>
          <p className="mb-8 text-white/60">
            Enter your birth information to generate your BaZi and astrology profile.
          </p>

          <Input
            label="Name"
            type="text"
            placeholder="Luna"
            icon={<Sparkles size={18} />}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Select
            label="Gender"
            icon={<UserRound size={18} />}
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />

          <Input
            label="Birth Date"
            type="date"
            icon={<Calendar size={18} />}
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          />

          <Input
            label="Birth Time"
            type="time"
            icon={<Clock size={18} />}
            value={form.birthTime}
            onChange={(e) => setForm({ ...form, birthTime: e.target.value })}
          />

          <Input
            label="Birth City"
            type="text"
            placeholder="Toronto"
            icon={<MapPin size={18} />}
            value={form.birthCity}
            onChange={(e) => setForm({ ...form, birthCity: e.target.value })}
          />

          <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-purple-500 px-6 py-4 font-medium shadow-[0_0_35px_rgba(168,85,247,0.6)] transition hover:bg-purple-400">
            Generate Fusion Profile
            <ArrowRight size={18} />
          </button>

          <p className="mt-5 text-xs leading-6 text-white/40">
            Demo note: planetary signs are calculated from astronomical ecliptic longitude.
            Ascendant and house accuracy require birth coordinates, timezone conversion,
            and a house system.
          </p>
        </form>

        <div className="space-y-6">
          {error && (
            <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-red-100">
              {error}
            </div>
          )}

          {profile && (
            <>
              <BaZiEightCharacters profile={profile} />

              {profile.hourInfo && (
                <div className="glass rounded-[2rem] p-6">
                  <h3 className="mb-5 font-serif text-3xl">Traditional Chinese Hour</h3>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-white/50">Birth Location</p>
                      <h4 className="mt-1 font-serif text-2xl text-purple-100">
                        {profile.location?.name}, {profile.location?.country}
                      </h4>
                      <p className="mt-3 text-sm text-white/60">
                        Latitude: {profile.location?.latitude} · Longitude: {profile.location?.longitude}
                      </p>
                      <p className="mt-2 text-sm text-white/60">
                        Timezone: {profile.location?.timezone}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-white/50">Hour Branch Result</p>
                      <h4 className="mt-1 font-serif text-3xl text-purple-100">
                        {profile.hourInfo.hourBranch} Hour · {profile.hourInfo.hourAnimal}
                      </h4>
                      <p className="mt-3 text-sm text-white/60">
                        Local birth time: {profile.hourInfo.inputLocalTime}
                      </p>
                      <p className="mt-2 text-sm text-white/60">
                        True solar time: {profile.hourInfo.trueSolarTime}
                      </p>
                      <p className="mt-2 text-sm text-white/60">
                        Traditional period: {profile.hourInfo.traditionalPeriod}
                      </p>
                      <p className="mt-2 text-sm text-white/60">
                        Meaning: {profile.hourInfo.traditionalMeaning}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-5 md:grid-cols-3">
                <ResultCard
                  title="Day Master"
                  value={`${profile.dayStemCN} · ${profile.dayMaster}`}
                  text={fiveElements[profile.dayMaster].meaning}
                />
                <ResultCard
                  title="Chinese Zodiac"
                  value={profile.chineseZodiac}
                  text="Your symbolic animal energy from the Earthly Branch cycle."
                />
                <ResultCard
                  title="Western Core"
                  value={`${profile.westernSign} Sun`}
                  text={`Moon in ${profile.moonSign}. Ascendant: ${profile.ascendant}.`}
                />
              </div>

              <DayMasterStrength profile={profile} />

              <div className="glass rounded-[2rem] p-6">
                <h3 className="mb-5 font-serif text-3xl">Five Elements Balance</h3>
                <div className="grid gap-4 md:grid-cols-5">
                  {Object.entries(profile.elementCount).map(([element, count]) => (
                    <ElementBar key={element} element={element} count={count} />
                  ))}
                </div>
              </div>

              <FiveElementCycle />

              <NatalWheel profile={profile} />

              <div className="glass rounded-[2rem] p-6">
                <h3 className="mb-5 font-serif text-3xl">Planetary Signs</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  {profile.planetarySigns.map((p) => (
                    <PlanetCard key={p.planet} planet={p} />
                  ))}
                </div>
              </div>
            </>
          )}

          <AIReadingCard profile={profile} loading={loading} reading={reading} />
        </div>
      </section>
    </main>
  );
}

function ZodiacWheel() {
  return (
    <div className="mx-auto flex h-80 w-80 items-center justify-center rounded-full border border-purple-300/40 bg-purple-500/10 shadow-[0_0_80px_rgba(124,58,237,0.35)]">
      <div className="relative h-64 w-64 rounded-full border border-white/20">
        {westernSigns.map((s, i) => {
          const angle = (i / 12) * 360;
          return (
            <div
              key={s.sign}
              className="absolute left-1/2 top-1/2 text-center text-xs text-purple-100"
              style={{
                transform: `rotate(${angle}deg) translate(0, -115px) rotate(-${angle}deg)`
              }}
            >
              <div className="text-2xl">{s.symbol}</div>
              <div>{s.sign}</div>
            </div>
          );
        })}

        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-purple-200/50 font-serif text-4xl">
          ✦
        </div>
      </div>
    </div>
  );
}

function BaZiEightCharacters({ profile }) {
  return (
    <div className="glass rounded-[2rem] p-6">
      <h3 className="mb-2 font-serif text-3xl">BaZi Eight Characters Chart</h3>
      <p className="mb-5 text-sm text-white/55">
        Each pillar contains one Heavenly Stem and one Earthly Branch. Colors represent
        Yin-Yang Five Element qualities.
      </p>

      <div className="grid gap-4 md:grid-cols-4">
        {profile.eightChars.map((p) => (
          <div
            key={p.pillar}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
          >
            <p className="mb-3 text-sm text-white/50">{p.pillar} Pillar</p>

            <div className={`mb-3 rounded-2xl p-4 text-white ${getColorClass(p.stem)}`}>
              <p className="text-4xl font-bold">{p.stem.cn}</p>
              <p className="mt-1 text-xs">
                {p.stem.name} · {p.stem.yinYang} {p.stem.element}
              </p>
            </div>

            <div className={`rounded-2xl p-4 text-white ${getColorClass(p.branch)}`}>
              <p className="text-4xl font-bold">{p.branch.cn}</p>
              <p className="mt-1 text-xs">
                {p.branch.name} · {p.branch.animal}
              </p>
              <p className="text-xs">
                {p.branch.yinYang} {p.branch.element} · {p.branch.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DayMasterStrength({ profile }) {
  return (
    <div className="glass rounded-[2rem] p-6">
      <h3 className="mb-5 font-serif text-3xl">Day Master Strength</h3>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Day Master</p>
          <h4 className="mt-1 font-serif text-3xl text-purple-100">
            {profile.dayStemCN} · {profile.dayMaster}
          </h4>
          <p className="mt-3 text-white/60">
            {fiveElements[profile.dayMaster].meaning}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Strength Result</p>
          <h4 className="mt-1 font-serif text-3xl text-purple-100">
            {profile.strength.status}
          </h4>
          <p className="mt-3 text-white/60">Score: {profile.strength.score}/7</p>
          <p className="mt-3 text-sm leading-6 text-purple-100">
            {profile.strength.favorable}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {profile.strength.reasons.map((reason, i) => (
          <p
            key={i}
            className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white/65"
          >
            {reason}
          </p>
        ))}
      </div>
    </div>
  );
}

function FiveElementCycle() {
  return (
    <div className="glass rounded-[2rem] p-6">
      <h3 className="mb-5 font-serif text-3xl">Five Elements Cycle</h3>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h4 className="mb-3 font-serif text-2xl text-purple-100">
            Generating Cycle
          </h4>
          {Object.entries(generatingCycle).map(([from, to]) => (
            <p key={from} className="text-sm leading-7 text-white/65">
              {from} generates {to}
            </p>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h4 className="mb-3 font-serif text-2xl text-purple-100">
            Controlling Cycle
          </h4>
          {Object.entries(controllingCycle).map(([from, to]) => (
            <p key={from} className="text-sm leading-7 text-white/65">
              {from} controls {to}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function NatalWheel({ profile }) {
  return (
    <div className="glass rounded-[2rem] p-6">
      <h3 className="mb-5 font-serif text-3xl">Zodiac Wheel</h3>

      <div className="mx-auto mb-6 flex h-80 w-80 items-center justify-center rounded-full border border-purple-300/40 bg-purple-500/10 shadow-[0_0_60px_rgba(168,85,247,0.35)]">
        <div className="relative h-64 w-64 rounded-full border border-white/20">
          {westernSigns.map((s, i) => {
            const angle = (i / 12) * 360;
            return (
              <div
                key={s.sign}
                className="absolute left-1/2 top-1/2 text-center text-[10px] text-purple-100"
                style={{
                  transform: `rotate(${angle}deg) translate(0, -118px) rotate(-${angle}deg)`
                }}
              >
                <div className="text-xl">{s.symbol}</div>
                <div>{s.sign}</div>
              </div>
            );
          })}

          <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-purple-200/50 bg-[#030817]/80 text-center">
            <span className="font-serif text-xl">SUN</span>
            <span className="text-xs text-purple-200">{profile.westernSign}</span>
          </div>
        </div>
      </div>

      <p className="text-center text-white/60">
        Sun: <span className="text-purple-200">{profile.westernSign}</span> ·
        Moon: <span className="text-purple-200"> {profile.moonSign}</span> ·
        Ascendant: <span className="text-purple-200"> {profile.ascendant}</span>
      </p>
    </div>
  );
}

function MiniCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-white/50">{title}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="glass rounded-[1.5rem] p-6">
      <div className="mb-5 inline-flex rounded-2xl bg-purple-500/20 p-3 text-purple-200">
        {icon}
      </div>
      <h3 className="mb-3 font-serif text-2xl">{title}</h3>
      <p className="leading-7 text-white/60">{text}</p>
    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 block text-sm text-white/60">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-purple-300/25 bg-white/5 px-4 py-3">
        <span className="text-purple-300">{icon}</span>
        <input
          {...props}
          className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
        />
      </div>
    </label>
  );
}

function Select({ label, icon, value, onChange }) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 block text-sm text-white/60">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-purple-300/25 bg-white/5 px-4 py-3">
        <span className="text-purple-300">{icon}</span>
        <select
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-white outline-none"
        >
          <option className="bg-[#030817]" value="">
            Select gender
          </option>
          <option className="bg-[#030817]" value="Female">
            Female
          </option>
          <option className="bg-[#030817]" value="Male">
            Male
          </option>
          <option className="bg-[#030817]" value="Non-binary">
            Non-binary
          </option>
          <option className="bg-[#030817]" value="Prefer not to say">
            Prefer not to say
          </option>
        </select>
      </div>
    </label>
  );
}

function ResultCard({ title, value, text }) {
  return (
    <motion.div
      className="glass rounded-[1.5rem] p-5"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-sm text-white/50">{title}</p>
      <h3 className="mt-1 font-serif text-2xl text-purple-100">{value}</h3>
      <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
    </motion.div>
  );
}

function ElementBar({ element, count }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center gap-2 text-purple-200">
        {elementIcons[element]}
        <span>{element}</span>
      </div>

      <div className="h-3 rounded-full bg-white/10">
        <div
          className="h-3 rounded-full bg-purple-400"
          style={{ width: `${Math.max(count * 12.5, 8)}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-white/50">{count}/8</p>
    </div>
  );
}

function PlanetCard({ planet }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-purple-300">
            {planetIcons[planet.planet] || <CircleDot size={18} />}
          </span>
          <h4 className="font-serif text-2xl text-purple-100">
            {planet.planet} in {planet.sign}
          </h4>
        </div>

        <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-100">
          {planet.element}
        </span>
      </div>

      <p className="mt-2 text-sm text-white/50">
        {planet.degree}° {planet.sign}
      </p>

      <p className="mt-3 text-sm leading-6 text-white/65">
        This placement reflects your {planet.meaning}.
      </p>
    </div>
  );
}

function AIReadingCard({ profile, loading, reading }) {
  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-8">
      <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute bottom-[-80px] left-[-80px] h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-purple-500/20 p-3 text-purple-200">
              <Briefcase size={24} />
            </div>

            <div>
              <h2 className="font-serif text-3xl">AI Fusion Reading</h2>
              <p className="mt-1 text-sm text-white/50">
                BaZi × Astrology × Personalized Guidance
              </p>
            </div>
          </div>

          {profile && (
            <div className="hidden rounded-full border border-purple-300/30 bg-white/5 px-4 py-2 text-sm text-purple-100 md:block">
              {profile.dayMaster} · {profile.westernSign}
            </div>
          )}
        </div>

        {!profile && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
            Your integrated reading will appear here after you submit your birth profile.
          </div>
        )}

        {loading && (
          <div className="space-y-4">
            <p className="animate-pulse text-purple-200">
              AI is weaving your BaZi structure and planetary chart together...
            </p>

            <div className="space-y-3">
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-11/12" />
              <SkeletonLine width="w-10/12" />
              <SkeletonLine width="w-9/12" />
            </div>
          </div>
        )}

        {reading && !loading && (
          <div className="rounded-[1.5rem] border border-white/10 bg-[#060b1f]/70 p-6">
            <div className="prose prose-invert max-w-none">
              <FormattedReading text={reading} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SkeletonLine({ width }) {
  return (
    <div className={`h-4 ${width} animate-pulse rounded-full bg-white/10`} />
  );
}

function FormattedReading({ text }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-3">
      {lines.map((line, index) => {
        const clean = line.trim();

        if (!clean) {
          return <div key={index} className="h-2" />;
        }

        if (clean.startsWith("##")) {
          return (
            <h3
              key={index}
              className="mt-8 font-serif text-2xl text-purple-100 first:mt-0"
            >
              {clean.replace(/^##\s*/, "")}
            </h3>
          );
        }

        if (/^\d+\./.test(clean)) {
          return (
            <p
              key={index}
              className="rounded-xl border border-purple-300/15 bg-purple-500/10 px-4 py-3 text-white/75"
            >
              {clean}
            </p>
          );
        }

        if (clean.startsWith("-")) {
          return (
            <p
              key={index}
              className="ml-4 border-l border-purple-300/30 pl-4 text-white/70"
            >
              {clean.replace(/^-\s*/, "")}
            </p>
          );
        }

        return (
          <p key={index} className="leading-8 text-white/75">
            {clean}
          </p>
        );
      })}
    </div>
  );
}
