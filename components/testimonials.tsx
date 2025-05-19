"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  // Quagmire's testimonials
  {
    content:
      "Giggity! This app is like my dating life - it keeps me lifting and never lets me down! The only thing that gets more reps than me is my right hand... if you know what I mean!",
    author: {
      name: "Glenn Quagmire",
      role: "Professional Ladies' Man",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6UILTHR4fNFYkiu4DyIhR3BzU_GT63vboSQ&s",
    },
    rating: 5,
  },
  {
    content:
      "Whoa! This app's got more features than I have ex-wives! And that's saying something, because I've got a lot of ex-wives... and a lot of restraining orders!",
    author: {
      name: "Glenn Quagmire",
      role: "Serial Dater",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6UILTHR4fNFYkiu4DyIhR3BzU_GT63vboSQ&s",
    },
    rating: 5,
  },
  // Peter's testimonials
  {
    content:
      "Hey Lois, this app is almost as good as my beer! I've been using it for 3 days and I'm already stronger than that chicken I fought last week. The only thing that's bigger than my gains is my belly!",
    author: {
      name: "Peter Griffin",
      role: "Beer Enthusiast & Chicken Fighter",
      image:
        "https://assets.foxdcg.com/dpp-uploaded/images/credits/270765094675/family_guy_seth_macfarlane_2x.jpg?fit=inside%7C*:278",
    },
    rating: 4,
  },
  {
    content:
      "This app is like my favorite bar - it's always there when I need it, and it helps me forget about my problems! Now I can lift weights AND drink beer at the same time!",
    author: {
      name: "Peter Griffin",
      role: "Pawtucket Patriot",
      image:
        "https://assets.foxdcg.com/dpp-uploaded/images/credits/270765094675/family_guy_seth_macfarlane_2x.jpg?fit=inside%7C*:278",
    },
    rating: 5,
  },
  // Chris's testimonials
  {
    content:
      "I'm not fat, I'm just cultivating mass! This app helped me realize that my 'dad bod' is actually a 'father figure physique'. Now I can lift more than just my video game controller!",
    author: {
      name: "Chris Griffin",
      role: "Mass Cultivator",
      image:
        "https://m.media-amazon.com/images/M/MV5BYWMxZTJiYjItZmY4Mi00Y2Q4LWI1MzAtZmVhZDI3N2Y4MDkxXkEyXkFqcGc@._V1_.jpg",
    },
    rating: 5,
  },
  {
    content:
      "This app is awesome! It's like having a personal trainer, but without the judgmental looks when I eat a whole pizza during my workout. I call it 'carb loading'!",
    author: {
      name: "Chris Griffin",
      role: "Pizza Enthusiast",
      image:
        "https://m.media-amazon.com/images/M/MV5BYWMxZTJiYjItZmY4Mi00Y2Q4LWI1MzAtZmVhZDI3N2Y4MDkxXkEyXkFqcGc@._V1_.jpg",
    },
    rating: 4,
  },
  // Stewie's testimonials
  {
    content:
      "Oh, how positively dreadful! This app is almost as sophisticated as my time machine. I've been using it to perfect my form while plotting world domination. Two birds, one stone, darling!",
    author: {
      name: "Stewie Griffin",
      role: "Evil Genius",
      image:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/family-guy/7/7e/Laser.jpg",
    },
    rating: 5,
  },
  {
    content:
      "Blast! This app is more precise than my death ray! I've been using it to calculate the exact amount of force needed to lift weights and overthrow governments. Multitasking at its finest!",
    author: {
      name: "Stewie Griffin",
      role: "World Domination Expert",
      image:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/family-guy/7/7e/Laser.jpg",
    },
    rating: 5,
  },
  // Brian's testimonials
  {
    content:
      "I must say, this app is quite the intellectual pursuit. It's like reading Nietzsche while doing squats - it exercises both the body and the mind. Though I still prefer a good martini after my workout.",
    author: {
      name: "Brian Griffin",
      role: "Intellectual Canine",
      image:
        "https://i.cbc.ca/1.2439270.1385396617!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/family-guy-brian-from-fox.jpg",
    },
    rating: 4,
  },
  {
    content:
      "This app is almost as sophisticated as my unpublished novel. I've been using it to perfect my form while contemplating existentialism. Nothing says 'enlightened' like deadlifting with proper form!",
    author: {
      name: "Brian Griffin",
      role: "Failed Novelist",
      image:
        "https://i.cbc.ca/1.2439270.1385396617!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/family-guy-brian-from-fox.jpg",
    },
    rating: 5,
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });
  const [isHovering, setIsHovering] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-scroll every 3 seconds when not hovering
  useEffect(() => {
    if (!emblaApi || isHovering) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(autoplay);
  }, [emblaApi, isHovering]);

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join thousands of satisfied users who have transformed their fitness
            journey with GymBro.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-4"
                >
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-600 h-full">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.author.image}
                          alt={testimonial.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {testimonial.author.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.author.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            suppressHydrationWarning
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            suppressHydrationWarning
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
