import oldManFace from '../assets/oldManFace.jpg'
import poet from '../assets/Poet.png'

// The story alternates between narration and verses exchanged over the board.
type StoryPart =
    | { kind: "narration"; text: string }
    | { kind: "verse"; speaker: string; somali: string[]; translation: string }

const story: StoryPart[] = [
    {
        kind: "narration",
        text: "Once upon a time, Wiilwaal, a great leader of Somali-Ethiopian origin who ruled the eastern province of Somaliland, suspected that his wife (a very beautiful woman who was much younger than her husband) had a particular feeling towards a youngster of the village, who happened to be one of Wiilwaal's nephews.",
    },
    {
        kind: "narration",
        text: "Wiilwaal invited the young man to play a Shax game with him. The clansmen understood that something unusual was to happen, and that the young man would have to solve a great enigma. If he failed, he ran the risk of losing his life.",
    },
    {
        kind: "narration",
        text: "Following the pattern of traditional communication, Wiilwaal engaged his nephew in a poetic riddle, and before choosing the first piece on the board, he recited the following lines:",
    },
    {
        kind: "verse",
        speaker: "Wiilwaal",
        somali: [
            "Sac wahaab oo wayl watoo wiilasha eryooda;",
            "…",
            "Inaadan wali naaskiisa qaban ii mar wacad eebe!",
            "Kanaan degay.",
        ],
        translation: "(If) there is a mad cow with a female calf near a well, and this crazy cow chases the boy; swear by God that you never touched its teat! I put my piece there.",
    },
    {
        kind: "narration",
        text: "The young man understood that his uncle's invitation was not really about playing a game of Shax, and before choosing his piece, he responded with the following lines:",
    },
    {
        kind: "verse",
        speaker: "The Nephew",
        somali: [
            "Waanaad i siisaye, adeer hal aan ku waydiiyo,",
            "Hal waraabe cunay, oo haddana waran xalaaleeyey",
            "Inaadan weel u soo qaadateen, ii mar wacad eebe.",
        ],
        translation: "Oh, my uncle, you gave me advice; let me ask you a question. (If) a she-camel is killed by a hyena and slaughtered by the owner, and you are told to take a quarter for free; swear by God that you would not bring a vessel for it! I put my piece here.",
    },
]

export const AboutShax: React.FC = () => {

    return(

    <section id="about" className="scroll-mt-20 py-16 lg:py-24 border-b border-[#EAE5DC]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Narrative */}
          <div className="lg:col-span-7 max-w-2xl">
            <span className="block text-[11px] font-mono tracking-widest uppercase text-[#9E3A14]">
              A Somali Game of Strategy
            </span>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#1C1917] tracking-tight leading-[1.08] text-balance">
              Welcome To Shax
            </h1>

            <p className="mt-6 text-lg lg:text-xl font-serif text-[#57534E] leading-relaxed">
              Shax is, like chess, an indoor popular game known in every part of Somaliland. It is generally the favourite game of all elderly people, who are not active enough to participate in outdoor games. In fact, the game can never possibly be played by more than two people, but it always attracts a number of spectators who sit or stand all round the two players for long hours and forget or intentionally neglect all their personal affairs.
            </p>

            {/* Archival excerpt */}
            <blockquote className="mt-10 pl-6 border-l-2 border-[#9E3A14]/60">
              <span className="block text-[11px] font-mono tracking-widest uppercase text-[#78716C]">
                Under the Big Tree
              </span>
              <p className="mt-3 text-base lg:text-lg font-serif italic text-[#44403C] leading-relaxed">
                In the more quiet parts of our big towns, where there is little distraction, one may often notice little groups of elderly people sitting or squatting close together on the ground under a big tree. One may cast a short and indifferent look at them and pass on; on the other hand, the interested may at once go to one group, only to find that two men are playing a game called Shax while all the rest are watching and playing it with their eyes, deeply interested.
              </p>
            </blockquote>
          </div>

          {/* Right: Archival photo */}
          <figure className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none border border-[#EAE5DC] bg-white p-4 rounded-sm shadow-xs">
            <div className="relative overflow-hidden bg-[#EFEAE1] aspect-3/4">
              <img
                src={oldManFace}
                alt="Portrait of an elder custodian of Shax and customary law"
                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#1C1917]/80 text-[#FBF9F5] text-[10px] font-mono tracking-widest uppercase rounded-xs">
                Plate I · Fig. 01
              </span>
            </div>

            <figcaption className="pt-4 px-1">
              <span className="block text-[11px] font-mono tracking-widest uppercase text-[#78716C]">
                Coastal Somaliland
              </span>
              <h2 className="mt-1.5 text-sm font-serif font-semibold text-[#1C1917]">
                Shax Spectator
              </h2>
              <p className="mt-1 text-xs text-[#57534E] font-serif italic leading-relaxed">
                One seldom sees a game of Shax being played without a crowd of spectators, most of whom are advising the players.
              </p>
            </figcaption>
          </figure>
        </div>

        {/* Shax & Somali Literature */}
        <div className="mt-20 lg:mt-28 pt-20 lg:pt-28 border-t border-[#EAE5DC] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Right: Narrative & poem */}
          <div className="lg:col-span-7 max-w-2xl">
            <span className="block text-[11px] font-mono tracking-widest uppercase text-[#9E3A14]">
              Oral Tradition
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#1C1917] tracking-tight leading-[1.1] text-balance">
              Shax &amp; Somali Literature
            </h2>

            <p className="mt-6 text-lg lg:text-xl font-serif text-[#57534E] leading-relaxed">
               There are many historical events related to the Shax game. Some of them are riddles used by wise men to lead the nomadic life of their clansmen. Others are related to the resolution of war between the different tribes, or passing on a message of threat. 
            </p>

            <p className="mt-4 text-base lg:text-lg font-serif text-[#57534E] leading-relaxed">
              The story here reported is an unusual communication between a chief leader and one of his nephews.
            </p>

            {/* Story */}
            <article className="mt-12">
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#78716C]">
                  The Story of Wiilwaal
                </span>
                <span className="h-px flex-1 bg-[#EAE5DC]" />
              </div>

              <div className="mt-6 space-y-6">
                {story.map((part, i) =>
                  part.kind === "narration" ? (
                    <p
                      key={i}
                      className={`text-base lg:text-lg font-serif text-[#44403C] leading-relaxed ${
                        i === 0
                          ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:leading-[0.8] first-letter:font-medium first-letter:text-[#9E3A14]"
                          : ""
                      }`}
                    >
                      {part.text}
                    </p>
                  ) : (
                    <figure
                      key={i}
                      className="my-8 border-l-2 border-[#9E3A14]/60 bg-[#F6F2EA] rounded-r-sm px-6 py-6 lg:px-8"
                    >
                      <span className="block text-[11px] font-mono tracking-widest uppercase text-[#9E3A14]">
                        {part.speaker}
                      </span>
                      <blockquote lang="so" className="mt-3 text-lg lg:text-xl font-serif italic text-[#1C1917] leading-relaxed">
                        {part.somali.map((line, j) => (
                          <span key={j} className="block">{line}</span>
                        ))}
                      </blockquote>
                      <figcaption className="mt-4 pt-4 border-t border-[#E3DCCF] text-sm lg:text-base font-serif text-[#57534E] leading-relaxed">
                        “{part.translation}”
                      </figcaption>
                    </figure>
                  )
                )}
              </div>
            </article>
          </div>

          {/* Left: Poet portrait & proverb */}
          <div className="lg:col-span-5 lg:order-first w-full max-w-md mx-auto lg:max-w-none lg:sticky lg:top-24">
            <figure className="border border-[#EAE5DC] bg-white p-4 rounded-sm shadow-xs">
              <div className="relative overflow-hidden bg-[#EFEAE1] aspect-3/4">
                <img
                  src={poet}
                  alt="Portrait of a Somali poet"
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#1C1917]/80 text-[#FBF9F5] text-[10px] font-mono tracking-widest uppercase rounded-xs">
                  Plate II · Fig. 02
                </span>
              </div>

              {/* Proverb, set directly beneath the portrait */}
              <figcaption className="pt-6 pb-2 px-2 text-center">
                <span className="block text-[11px] font-mono tracking-widest uppercase text-[#9E3A14]">
                  Somali Proverb
                </span>
                <p lang="so" className="mt-3 text-xl lg:text-2xl font-serif italic text-[#1C1917] leading-snug text-balance">
                  “Shaxdaan degay ba maad garan, wayna kaa shishaysaa”
                </p>
                <span className="mx-auto mt-4 block h-px w-10 bg-[#9E3A14]/40" />
                <p className="mt-4 text-sm font-serif text-[#57534E] leading-relaxed text-balance">
                  You did not understand my Shax (strategy) at all, and it is very far from you.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    );

}
