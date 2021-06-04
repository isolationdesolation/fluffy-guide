export const roomsOptions = [
    {
        roomsAmount: 1,
        chosen: false
    },
    {
        roomsAmount: 2,
        chosen: false
    },
    {
        roomsAmount: 3,
        chosen: false
    },
    {
        roomsAmount: 4,
        chosen: false
    },
    {
        roomsAmount: 5,
        chosen: false
    }
]

export const citySelect = ["Все города", "Тюмень", "Москва", "Екатеринбург", "Сургут", "Нижневартовск", "Пермь", "Челябинск"]

export const categoryOptions = [
    {
        name: "квартира",
        chosen: false
    },
    {
        name: "дом",
        chosen: false
    },
    {
        name: "участок",
        chosen: false
    },
    {
        name: "дом с участком",
        chosen: false
    },
    {
        name: "дача",
        chosen: false
    },
    {
        name: "коммерческая",
        chosen: false
    }
]

export const categoryId: Record<string, string> = {
    "квартира": "8",
    "дом": "4",
    "участок": "5", 
    "дом с участком": "10",
    "дача": "11",
    "коммерческая": "9",
}

export const cityId: Record<string, string> = {
    "Нижневартовск": "3",
    "Челябинск": "13",
    "Пермь": "5",
    "Сургут": "6",
    "Тюмень": "8",
    "Москва": "1",
    "Екатеринбург": "2",
}