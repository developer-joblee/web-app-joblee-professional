export type FormProps = {
  name: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  portfolioPhotos: string[];
  profilePhoto: string;
  description: string;
  services: string[];
  address: AddressProps;
};

export type AddressProps = {
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  street: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  complement?: string;
};
