export type PublicStaffMember = {
  _id: string
  name: string
  role: string
  biography: string
  image: string
  order: number
}

export const defaultStaff: PublicStaffMember[] = [
  {
    _id: "local:marin-vale",
    name: "Marin Vale",
    role: "Executive Chef",
    biography: "Builds the menu around shellfish, citrus, smoke, and the day's best catch.",
    image:
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=900&q=85",
    order: 0,
  },
  {
    _id: "local:elliot-crane",
    name: "Elliot Crane",
    role: "Chef de Cuisine",
    biography: "Keeps the line precise, fast, and generous.",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=85",
    order: 1,
  },
  {
    _id: "local:simone-hart",
    name: "Simone Hart",
    role: "Beverage Director",
    biography: "Writes the drinks list in blue, citrus, salt, and sparkle.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=85",
    order: 2,
  },
  {
    _id: "local:theo-banks",
    name: "Theo Banks",
    role: "General Manager",
    biography: "Makes the room feel easy before the first glass lands.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
    order: 3,
  },
  {
    _id: "local:june-mercer",
    name: "June Mercer",
    role: "Events Lead",
    biography: "Shapes private dinners, seasonal nights, and celebrations around the table.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
    order: 4,
  },
  {
    _id: "local:nico-reyes",
    name: "Nico Reyes",
    role: "Raw Bar Lead",
    biography: "Keeps the ice cold, the oysters clean, and the counter moving.",
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=900&q=85",
    order: 5,
  },
]
