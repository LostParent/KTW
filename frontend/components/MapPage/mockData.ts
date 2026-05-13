export const MAP_PLACES = [
    {
        id: 'kuwait_towers',
        title: 'Kuwait Towers',
        category: 'Historical',
        distance: '2.5 km',
        rating: 4.8,
        reviewsCount: '2.1k',
        image: '/kuwait_skyline_hero.png',
        location: 'Arabian Gulf Street, Kuwait City',
        description: 'The Kuwait Towers are a group of three slender towers in Kuwait City, standing on a promontory into the Persian Gulf. They were the sixth, and last, group in the larger system of the Kuwait Water Towers of 33 towers.',
        isOpen: true,
        isTopRated: true,
        closingTime: '11 PM',
        position: { lat: 29.3897, lng: 48.0033 }
    },
    {
        id: 'mubarakiya',
        title: 'Souq Al-Mubarakiya',
        category: 'Historical',
        distance: '4.1 km',
        rating: 4.7,
        reviewsCount: '3.4k',
        image: '/kuwait_historical_cat.png',
        location: 'Kuwait City',
        description: 'One of the oldest markets in Kuwait where you can find spices, dates, traditional clothes, and souvenirs.',
        isClosingSoon: true,
        closingTime: '10 PM',
        position: { lat: 29.3731, lng: 47.9749 }
    },
    {
        id: 'grand_mosque',
        title: 'Grand Mosque',
        category: 'Historical',
        distance: '3.0 km',
        rating: 4.9,
        reviewsCount: '1.2k',
        image: '/kuwait_grand_mosque.jpg',
        location: 'Kuwait City',
        description: 'The largest mosque in Kuwait known for its stunning Islamic architecture and guided tours.',
        position: { lat: 29.3794, lng: 47.9749 },
        isOpen: true,
        closingTime: '7 PM'
    },
    {
        id: 'avenues',
        title: 'The Avenues',
        category: 'Shopping',
        distance: '8.5 km',
        rating: 4.6,
        reviewsCount: '5k+',
        image: '/kuwait_shoping.webp',
        location: 'Al Rai',
        description: 'The largest shopping mall in Kuwait, featuring international brands, an indoor bazaar, and various entertainment options.',
        position: { lat: 29.303, lng: 47.935 }, // Approx
        closingTime: '11 PM'
    }
];

export const CATEGORIES = ['All', 'Historical', 'Shopping', 'Dining', 'Nature'];
