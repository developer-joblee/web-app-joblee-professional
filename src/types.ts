export type UserProps = {
  id?: string;
  fullName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  isProfileCompleted?: boolean | null;
  portfolioPhotos: string[];
  profilePhoto: string;
  description: string;
  categories: { id: string }[];
  cognitoUserId: string;
  address: AddressProps[];
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
