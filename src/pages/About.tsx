import { motion } from 'framer-motion';

export function About() {
  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden mb-20">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2074&auto=format&fit=crop"
          alt="About ZAVERO"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-wider">The Art of Presence</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl space-y-24 text-center">
        
        {/* Intro */}
        <section className="space-y-6">
          <p className="text-xl text-gray-800 font-serif italic leading-relaxed">
            There was a time when clothing was not fast.<br/>
            It was not rushed.<br/>
            It was not disposable.
          </p>
          <p className="text-2xl font-bold text-black uppercase tracking-widest py-4">
            It was crafted.
          </p>
          <p className="text-gray-600 leading-relaxed">
            At ZAVERO, we do not create garments for trends.<br/>
            We create pieces for legacy.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our story began with a simple belief:
          </p>
          <h2 className="text-3xl font-serif font-bold text-black py-4">
            True luxury is not loud.<br/>
            It is felt.
          </h2>
          <p className="text-gray-600 leading-relaxed">
            It is the weight of fabric that falls perfectly on the shoulders.<br/>
            It is the silence of precise stitching.<br/>
            It is the confidence that enters a room before you speak.
          </p>
          <p className="text-lg font-medium text-black">
            We design for the man who understands presence.
          </p>
        </section>

        {/* Beyond Fabric */}
        <section className="space-y-6">
          <h2 className="text-3xl font-serif font-bold mb-6">Beyond Fabric. Beyond Fashion.</h2>
          <p className="text-gray-600 leading-relaxed">
            Every shirt and every pair of pants we create begins long before the first cut.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We travel through textures.<br/>
            We study structure.<br/>
            We test weight, fall, breathability, and resilience.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Only the finest materials are selected —<br/>
            premium long-staple cottons, refined blends, structured weaves —<br/>
            chosen not for trend, but for character.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Each fabric is selected for how it moves,<br/>
            how it ages,<br/>
            how it responds to life.
          </p>
          <p className="text-lg font-medium text-black italic">
            Because luxury should not fade.<br/>
            It should evolve with you.
          </p>
        </section>

        {/* Craftsmanship */}
        <section className="space-y-6">
          <h2 className="text-3xl font-serif font-bold mb-6">The Discipline of Craftsmanship</h2>
          <p className="text-gray-600 leading-relaxed">
            Our garments are not mass-produced.<br/>
            They are constructed with discipline.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From precision-cut patterns to reinforced seams,<br/>
            from balanced drape to tailored structure,<br/>
            every detail is intentional.
          </p>
          <p className="text-gray-600 leading-relaxed font-medium">
            We measure.<br/>
            We refine.<br/>
            We perfect.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our shirts are engineered to sit flawlessly on the shoulders.<br/>
            Our pants are structured to create presence in every stride.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nothing excessive.<br/>
            Nothing accidental.
          </p>
          <p className="text-xl font-serif font-bold text-black">
            Only mastery in restraint.
          </p>
        </section>

        {/* Philosophy of Power */}
        <section className="space-y-6 bg-gray-50 p-12 rounded-sm">
          <h2 className="text-3xl font-serif font-bold mb-6">The Philosophy of Power</h2>
          <p className="text-gray-600 leading-relaxed">
            Luxury is not about decoration.<br/>
            It is about identity.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The men who wear ZAVERO do not chase attention.<br/>
            They command it.
          </p>
          <p className="text-gray-600 leading-relaxed">
            They understand that true power lies in subtlety.<br/>
            That refinement is strength.<br/>
            That confidence does not need permission.
          </p>
          <div className="py-6">
            <p className="text-gray-800 font-medium mb-4">Our designs are built for:</p>
            <ul className="text-gray-600 space-y-2 font-serif">
              <li>• Boardrooms</li>
              <li>• Private gatherings</li>
              <li>• Evening drives</li>
              <li>• Moments that matter</li>
            </ul>
          </div>
          <p className="text-lg font-medium text-black">
            Because greatness is often quiet.
          </p>
        </section>

        {/* Limited */}
        <section className="space-y-6">
          <h2 className="text-3xl font-serif font-bold mb-6">Limited. Intentional. Rare.</h2>
          <p className="text-gray-600 leading-relaxed">
            We do not believe in endless stock.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Each collection is released in limited quantities.<br/>
            Not to create hype —<br/>
            but to preserve meaning.
          </p>
          <p className="text-gray-600 leading-relaxed">
            When you own a piece from us,<br/>
            you own something not everyone can access.
          </p>
          <p className="text-lg font-medium text-black italic">
            Exclusivity is not marketing.<br/>
            It is respect for craft.
          </p>
        </section>

        {/* Excellence */}
        <section className="space-y-6">
          <h2 className="text-3xl font-serif font-bold mb-6">A Commitment to Excellence</h2>
          <p className="text-gray-600 leading-relaxed">
            Every button is chosen for durability.<br/>
            Every stitch tested for strength.<br/>
            Every silhouette reviewed for balance.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We reject shortcuts.<br/>
            We reject compromise.
          </p>
          <p className="text-lg font-medium text-black">
            Because our garments carry our name —<br/>
            and your reputation.
          </p>
        </section>

        {/* Legacy */}
        <section className="space-y-6">
          <h2 className="text-3xl font-serif font-bold mb-6">Designed for Legacy</h2>
          <p className="text-gray-600 leading-relaxed">
            Clothing should not simply be worn.<br/>
            It should be remembered.
          </p>
          <p className="text-gray-600 leading-relaxed font-serif italic">
            A handshake.<br/>
            A first impression.<br/>
            A defining moment.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We design for those moments.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Not for the season.<br/>
            Not for the crowd.<br/>
            But for the man building something lasting.
          </p>
        </section>

        {/* Promise */}
        <section className="space-y-8 py-12 border-t border-b border-gray-200">
          <h2 className="text-3xl font-serif font-bold mb-6">Our Promise</h2>
          <p className="text-gray-600 leading-relaxed">
            When you wear ZAVERO,<br/>
            you do not wear fashion.
          </p>
          <p className="text-xl font-serif text-black">
            You wear intention.<br/>
            You wear discipline.<br/>
            You wear identity.
          </p>
          <p className="text-gray-600 leading-relaxed">
            And in a world that moves fast and forgets quickly,<br/>
            you remain unforgettable.
          </p>
        </section>

        {/* Footer Signature */}
        <div className="pt-12 pb-20">
          <h3 className="text-4xl font-serif font-bold tracking-widest mb-4">ZAVERO</h3>
          <p className="text-gray-500 uppercase tracking-wide text-sm">
            Crafted for Presence.<br/>
            Built for Legacy.
          </p>
        </div>

      </div>
    </div>
  );
}
