import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Heart, Users, Award, TreePine, Star, HeartHandshake, BookMarked, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const values = [
  {
    icon: Heart,
    title: 'Stories That Matter',
    description: 'We believe every child deserves books that reflect their world, spark their curiosity, and nurture their emotional growth.',
  },
  {
    icon: Sparkles,
    title: 'Quality Over Quantity',
    description: 'Our collection is carefully curated—every book passes through the hands of parents, educators, and children before it reaches our shelves.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We partner with independent authors, local illustrators, and small publishers to bring unique voices to your bookshelf.',
  },
  {
    icon: Award,
    title: 'Award-Winning Excellence',
    description: 'From Caldecott winners to hidden gems, we celebrate stories recognized for their artistic and literary merit.',
  },
];

const team = [
  {
    name: 'Sarah Mitchell',
    role: 'Founder & Chief Story Curator',
    bio: 'Former children\'s librarian with 15 years connecting kids with books. Mother of two voracious readers.',
    icon: BookOpen,
  },
  {
    name: 'Marcus Chen',
    role: 'Head of Author Relations',
    bio: 'Published author and former editor dedicated to discovering diverse voices in children\'s literature.',
    icon: Sparkles,
  },
  {
    name: 'Priya Patel',
    role: 'Education Specialist',
    bio: 'Early childhood educator ensuring every book supports developmental milestones and learning joy.',
    icon: GraduationCap,
  },
  {
    name: 'James Rivera',
    role: 'Community & Partnerships',
    bio: 'Builds relationships with schools, libraries, and literacy nonprofits to expand access to quality books.',
    icon: HeartHandshake,
  },
];

const milestones = [
  { year: '2019', title: 'StorySprout Founded', description: 'Started in a garage with 50 curated titles and a dream to make quality books accessible.' },
  { year: '2020', title: 'First 1,000 Families', description: 'Reached our first milestone of serving 1,000 families across the country.' },
  { year: '2021', title: 'Author Partnership Program', description: 'Launched direct partnerships with 25+ independent authors and illustrators.' },
  { year: '2022', title: 'Literacy Nonprofit Partner', description: 'For every book sold, we donate one to children in underserved communities.' },
  { year: '2023', title: '50,000+ Happy Readers', description: 'Celebrated 50,000 families who\'ve discovered magical stories through StorySprout.' },
  { year: '2024', title: 'Award-Winning Collection', description: 'Curated 200+ award-winning titles including Caldecott, Newbery, and Coretta Scott King winners.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent" />
        <div className="absolute top-20 left-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-accent/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Our Story</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Growing Readers, One Magical Story at a Time
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Founded by a children's librarian who believed every child deserves access to stories that inspire, comfort, and empower.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/shop">Explore Our Collection</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Our Guiding Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These principles shape every decision we make, from the books we choose to how we serve our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className={cn('hover:shadow-xl transition-shadow duration-300 border-border', index === 0 && 'border-primary/30')}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-display">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From a small curation project to a trusted destination for families nationwide.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg z-10">
                    {index + 1}
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-display font-bold text-primary text-lg">{milestone.year}</span>
                      <h3 className="font-display font-semibold text-xl">{milestone.title}</h3>
                    </div>
                    <p className="text-muted-foreground ml-19">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate book lovers, educators, and parents dedicated to bringing the best stories to your family.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
                    <member.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-display">{member.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">Every Book Makes an Impact</h2>
              <p className="text-muted-foreground text-lg mb-8">
                We believe access to quality books shouldn't be a privilege. Through our Book for Book program,
                every purchase helps put a book in the hands of a child who needs it most.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookMarked className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">1-for-1 Book Donation</div>
                    <div className="text-sm text-muted-foreground">Every purchase donates a book to our literacy partners</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <TreePine className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Eco-Friendly Packaging</div>
                    <div className="text-sm text-muted-foreground">100% recyclable, plastic-free shipping materials</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Supporting Independent Voices</div>
                    <div className="text-sm text-muted-foreground">Direct partnerships with diverse authors & illustrators</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-orange-400 p-1">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-orange-400/20 flex items-center justify-center text-primary-foreground">
                  <div className="text-center p-8">
                    <BookOpen className="w-24 h-24 mx-auto mb-6 opacity-90" />
                    <h3 className="font-display font-bold text-3xl sm:text-4xl mb-2">100,000+</h3>
                    <p className="text-lg opacity-90">Books Donated & Counting</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-primary to-orange-500">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Discover Magical Stories?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join thousands of families who trust StorySprout for their children's reading journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-4" asChild>
              <Link to="/shop">Start Exploring</Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-4 border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}