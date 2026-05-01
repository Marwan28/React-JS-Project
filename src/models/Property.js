export default class Property {
  constructor({
    title,
    price,
    city,
    address,
    description,
    image,
    bedrooms,
    bathrooms,
    area,
    type,
    featured = false,
    agent_id,
    id = null,
  }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.city = city;
    this.address = address;
    this.description = description;
    this.image = image;
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.area = area;
    this.type = type;
    this.featured = featured;
    this.agent_id = agent_id;
  }
}
