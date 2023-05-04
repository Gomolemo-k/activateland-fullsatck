// import images
import LogoImg from '../../img/logo/logo.svg';
import HeroImg from '../../img/landing-page/hero/image.svg';
import OverviewProductImg from '../../img/landing-page/overview/product.svg';
import FacebookImg from '../../img/landing-page/overview/brands/facebook.svg';
import GoogleImg from '../../img/landing-page/overview/brands/google.svg';
import CocaColaImg from '../../img/landing-page/overview/brands/coca-cola.svg';
import LinkedInImg from '../../img/landing-page/overview/brands/linkedin.svg';
import SamsungImg from '../../img/landing-page/overview/brands/samsung.svg';
import Feature1Img from '../../img/landing-page/features/feature1-img.svg';
import Feature2Img from '../../img/landing-page/features/feature2-img.svg';
import Feature3Img from '../../img/landing-page/features/feature3-img.svg';
import ArrowRightImg from '../../img/landing-page/features/arrow-right.svg';
import CardIconImg1 from '../../img/landing-page/product/cards/icon1.svg';
import CardIconImg2 from '../../img/landing-page/product/cards/icon2.svg';
import CardIconImg3 from '../../img/landing-page/product/cards/icon3.svg';
import PricingIcon1 from '../../img/landing-page/pricing/icon1.svg';
import PricingIcon2 from '../../img/landing-page/pricing/icon2.svg';
import PricingIcon3 from '../../img/landing-page/pricing/icon3.svg';
import AvatarImg1 from '../../img/landing-page/testimonial/avatar1.png';
import AvatarImg2 from '../../img/landing-page/testimonial/avatar2.png';
import AvatarImg3 from '../../img/landing-page/testimonial/avatar3.png';
import AvatarImg4 from '../../img/landing-page/testimonial/avatar4.png';
import AvatarImg5 from '../../img/landing-page/testimonial/avatar5.png';
import CtaImg1 from '../../img/landing-page/cta/image1.svg';
import CtaImg2 from '../../img/landing-page/cta/image2.svg';
import FacebookIcon from '../../img/landing-page/copyright/facebook.svg';
import TwitterIcon from '../../img/landing-page/copyright/twitter.svg';
import LinkedinIcon from '../../img/landing-page/copyright/linkedin.svg';
import ArrowImg from '../../img/landing-page/product/cards/arrow.svg';

import CookieConsentCss from '../../css/landing-page/CookieConsent.css';

export const cookieConsent = {
  css: CookieConsentCss,
};

export const header = {
  logo: LogoImg,
  btnText: 'Try it now!',
};

export const nav = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '#feature1' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#footer' },
];

export const hero = {
  id: 'hero',
  title: 'Analyze Real Estate Investment Opportunities',
  subtitle: 'A comprehensive SaaS platform for property investors - Discover, compare, and analyze potential investments with ease',
  btnText: 'Get Started',
  compText: '— Web, iOS and Android',
  image: HeroImg,
};

export const overview = {
  id: 'overview',
  productImg: OverviewProductImg,
};

export const brands = {
  id: 'brands',
  logos: [
    {
      image: FacebookImg,
      delay: 300,
    },
    {
      image: GoogleImg,
      delay: 400,
    },
    {
      image: CocaColaImg,
      delay: 500,
    },
    {
      image: LinkedInImg,
      delay: 600,
    },
    {
      image: SamsungImg,
      delay: 700,
    },
  ],
};

export const features = {
  feature1: {
    id: 'feature1',
    pretitle: 'Full Control',
    title: 'In-depth Property Analysis',
    subtitle:
      'Leverage extensive data sets and advanced analytics to evaluate potential investments, identify trends, and make informed decisions.',
    btnLink: 'Learn more',
    btnIcon: ArrowRightImg,
    image: Feature1Img,
  },
  feature2: {
    id: 'feature2',
    pretitle: 'Collaborative Platform',
    title: 'Work Seamlessly with Teams',
    subtitle:
      'Create projects and workgroups, share findings, and collaborate with your team to maximize efficiency in your investment process.',
    btnLink: 'Learn more',
    btnIcon: ArrowRightImg,
    image: Feature2Img,
  },
  feature3: {
    id: 'feature3',
    pretitle: 'Manage Opportunities',
    title: 'Personalized Investment Tracking',
    subtitle:
      'Monitor and manage your property portfolio and investment opportunities, offering a comprehensive overview of your investments.',
    btnLink: 'Learn more',
    btnIcon: ArrowRightImg,
    image: Feature3Img,
  },
};


export const product = {
  id: 'product',
  title: 'Experience the Advantages.',
  arrowImg: ArrowImg,
  subtitle:
    'Utilize cutting-edge technology and innovative features to streamline your real estate investment process and maximize returns.',
  cards: [
    {
      icon: CardIconImg1,
      title: 'Scalable Architecture',
      subtitle: 'Built with microservices for seamless integration and enhanced performance.',
      delay: 200,
    },
    {
      icon: CardIconImg2,
      title: 'Secure & Reliable',
      subtitle: 'Experience robust data security and reliable access to your investment data.',
      delay: 400,
    },
    {
      icon: CardIconImg3,
      title: 'Intuitive Design',
      subtitle: 'Effortlessly navigate and utilize the platform with a user-friendly interface.',
      delay: 600,
    },
  ],
};


export const pricing = {
  id: 'pricing',
  title: 'Choose Your Ideal Plan',
  cards: [
    {
      icon: PricingIcon1,
      title: 'Free Plan',
      services: [
        { name: 'Access to Core Features' },
        { name: 'Up to 3 Property Analyses' },
        { name: 'Standard Customer Support' },
      ],
      price: '$0',
      userAmount: 'per user, per month',
      btnText: 'Get Started',
      delay: 300,
    },
    {
      icon: PricingIcon2,
      title: 'Pro Plan',
      services: [
        { name: 'Unlimited Property Analyses' },
        { name: 'Advanced Analytics & Reporting' },
        { name: 'Priority Customer Support' },
      ],
      price: '$49.99',
      userAmount: 'per user, per month',
      btnText: 'Get Started',
      delay: 600,
    },
    {
      icon: PricingIcon3,
      title: 'Enterprise Plan',
      services: [
        { name: 'Custom Integrations & Features' },
        { name: 'Dedicated Account Manager' },
        { name: '24/7 Premium Support' },
      ],
      price: 'Custom Pricing',
      userAmount: 'Contact us for a tailored solution',
      btnText: 'Contact Us',
      delay: 900,
    },
  ],
};

export const testimonials = {
  id: 'testimonials',
  title: 'Trusted by Property Investors Worldwide',
  clients: [
    {
      message:
        'This platform has been a game-changer for my investment strategy. The in-depth property analysis and intuitive interface make it easy to discover and evaluate potential investments.',
      image: AvatarImg1,
      name: 'Cameron Williamson',
      position: 'Real Estate Investor',
      borderColor: '#FF7235',
    },
    {
      message:
        'I love the collaborative features of the platform. Being able to work seamlessly with my team on investment projects has significantly improved our efficiency and decision-making.',
      image: AvatarImg2,
      name: 'Shirley Hand',
      position: 'Property Developer',
      borderColor: '#FFBE21',
    },
    {
      message:
        'The customizable dashboard and advanced analytics have made it easier than ever to monitor my investment portfolio and make informed decisions.',
      image: AvatarImg3,
      name: 'Dr. Olivia Hansen',
      position: 'Real Estate Consultant',
      borderColor: '#4756DF',
    },
    {
      message:
        'I appreciate the scalability and security of the platform. As my property portfolio has grown, the application has continued to meet my needs without compromising performance or data security.',
      image: AvatarImg4,
      name: 'Aubrey Sanford',
      position: 'Real Estate Entrepreneur',
      borderColor: '#3EC1F3',
    },
    {
      message:
        "Their customer support has been fantastic. Whenever I've had questions or issues, they've been quick to respond and provide solutions. I highly recommend this platform for property investors.",
      image: AvatarImg5,
      name: 'Terri Conroy',
      position: 'Real Estate Agent',
      borderColor: '#BB7259',
    },
  ],
};

export const cta = {
  id: 'cta',
  title: 'Join Thousands of Satisfied Property Investors',
  subtitle: 'Experience the powerful features with a start free plan.',
  btnText: 'Start Your Free Plan',
  img1: CtaImg1,
  img2: CtaImg2,
};


export const footer = {
  id: 'footer',
  logo: LogoImg,
  links: [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#feature1' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#footer' },
  ],
  legal: [
    { name: 'Terms of use', href: '/' },
    { name: 'Privacy policy', href: '/' },
    { name: 'Cookie policy', href: '/' },
    { name: 'Service guarantees', href: '/' },
  ],
  newsletter: {
    title: 'Newsletter',
    subtitle: 'Over 25000 people have subscribed',
  },
  form: {
    placeholder: 'Enter your email',
    btnText: 'Subscribe',
    smallText: "We don't sell your email and spam",
  },
};

export const copyright = {
  id: 'copyright',
  link1: {
    name: 'Privacy & Terms',
    href: '/',
  },
  link2: {
    name: 'Contact us',
    href: '/',
  },
  copyText: 'Copyright @ 2023 ActivateLand',
  social: [
    { icon: FacebookIcon, href: '/' },
    { icon: TwitterIcon, href: '/' },
    { icon: LinkedinIcon, href: '/' },
  ],
};
