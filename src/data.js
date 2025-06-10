// src/data.js

// Combined and Normalized Plant Data (from ProductList.jsx plantsArray)
// Note: IDs added, cost converted to numeric price for calculations
export const PLANTS_DATA = [
    // Air Purifying Plants
    { id: 'plant-ap1', name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', price: 15.00, category: 'Air Purifying Plants' },
    { id: 'plant-ap2', name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', price: 12.00, category: 'Air Purifying Plants' },
    { id: 'plant-ap3', name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', price: 18.00, category: 'Air Purifying Plants' },
    { id: 'plant-ap4', name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Adds humidity to the air and removes toxins.', price: 20.00, category: 'Air Purifying Plants' },
    { id: 'plant-ap5', name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'Easy to care for and effective at removing toxins.', price: 17.00, category: 'Air Purifying Plants' },
    { id: 'plant-ap6', name: 'Aloe Vera (Air Purifying)', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Purifies the air and has healing properties for skin.', price: 14.00, category: 'Air Purifying Plants' },
    // Aromatic Fragrant Plants
    { id: 'plant-af1', name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Calming scent, used in aromatherapy.', price: 20.00, category: 'Aromatic Fragrant Plants' },
    { id: 'plant-af2', name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Sweet fragrance, promotes relaxation.', price: 18.00, category: 'Aromatic Fragrant Plants' },
    { id: 'plant-af3', name: 'Rosemary', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg', description: 'Invigorating scent, often used in cooking.', price: 15.00, category: 'Aromatic Fragrant Plants' },
    { id: 'plant-af4', name: 'Mint', image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg', description: 'Refreshing aroma, used in teas and cooking.', price: 12.00, category: 'Aromatic Fragrant Plants' },
    { id: 'plant-af5', name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'Citrusy scent, relieves stress and promotes sleep.', price: 14.00, category: 'Aromatic Fragrant Plants' },
    { id: 'plant-af6', name: 'Hyacinth', image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg', description: 'Hyacinth is a beautiful flowering plant known for its fragrant.', price: 22.00, category: 'Aromatic Fragrant Plants' },
    // Insect Repellent Plants
    { id: 'plant-ir1', name: 'Oregano', image: 'https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg', description: 'The oregano plants contains compounds that can deter certain insects.', price: 10.00, category: 'Insect Repellent Plants' },
    { id: 'plant-ir2', name: 'Marigold', image: 'https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg', description: 'Natural insect repellent, also adds color to the garden.', price: 8.00, category: 'Insect Repellent Plants' },
    { id: 'plant-ir3', name: 'Geraniums', image: 'https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg', description: 'Known for their insect-repelling properties while adding a pleasant scent.', price: 20.00, category: 'Insect Repellent Plants' },
    { id: 'plant-ir4', name: 'Basil', image: 'https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg', description: 'Repels flies and mosquitoes, also used in cooking.', price: 9.00, category: 'Insect Repellent Plants' },
    { id: 'plant-ir5', name: 'Catnip', image: 'https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg', description: 'Repels mosquitoes and attracts cats.', price: 13.00, category: 'Insect Repellent Plants' },
    // Medicinal Plants
    { id: 'plant-m1', name: 'Aloe Vera (Medicinal)', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Soothing gel used for skin ailments.', price: 14.00, category: 'Medicinal Plants' },
    { id: 'plant-m2', name: 'Echinacea', image: 'https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg', description: 'Boosts immune system, helps fight colds.', price: 16.00, category: 'Medicinal Plants' },
    { id: 'plant-m3', name: 'Peppermint', image: 'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg', description: 'Relieves digestive issues and headaches.', price: 13.00, category: 'Medicinal Plants' },
    { id: 'plant-m4', name: 'Lemon Balm (Medicinal)', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'Calms nerves and promotes relaxation.', price: 14.00, category: 'Medicinal Plants' },
    { id: 'plant-m5', name: 'Chamomile', image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg', description: 'Soothes anxiety and promotes sleep.', price: 15.00, category: 'Medicinal Plants' },
    { id: 'plant-m6', name: 'Calendula', image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg', description: 'Heals wounds and soothes skin irritations.', price: 12.00, category: 'Medicinal Plants' },
    // Low Maintenance Plants
    { id: 'plant-lm1', name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Thrives in low light and requires minimal watering.', price: 25.00, category: 'Low Maintenance Plants' },
    { id: 'plant-lm2', name: 'Pothos (Low Maintenance)', image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg', description: 'Tolerates neglect and can grow in various conditions.', price: 10.00, category: 'Low Maintenance Plants' },
    { id: 'plant-lm3', name: 'Snake Plant (Low Maintenance)', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Needs infrequent watering and is resilient to most pests.', price: 15.00, category: 'Low Maintenance Plants' },
    { id: 'plant-lm4', name: 'Cast Iron Plant', image: 'https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg', description: 'Hardy plant that tolerates low light and neglect.', price: 20.00, category: 'Low Maintenance Plants' },
    { id: 'plant-lm5', name: 'Succulents', image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg', description: 'Drought-tolerant plants with unique shapes and colors.', price: 18.00, category: 'Low Maintenance Plants' },
    { id: 'plant-lm6', name: 'Aglaonema', image: 'https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg', description: 'Requires minimal care and adds color to indoor spaces.', price: 22.00, category: 'Low Maintenance Plants' },
];

// Group plants by category for display on the Product Listing Page
export const CATEGORIES = {
    'Air Purifying Plants': PLANTS_DATA.filter(p => p.category === 'Air Purifying Plants'),
    'Aromatic Fragrant Plants': PLANTS_DATA.filter(p => p.category === 'Aromatic Fragrant Plants'),
    'Insect Repellent Plants': PLANTS_DATA.filter(p => p.category === 'Insect Repellent Plants'),
    'Medicinal Plants': PLANTS_DATA.filter(p => p.category === 'Medicinal Plants'),
    'Low Maintenance Plants': PLANTS_DATA.filter(p => p.category === 'Low Maintenance Plants'),
};

