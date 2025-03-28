export type TGeoCodeJSON = {
  features: TGeoCodeJSONFeature[];
};

export type TGeoCodeJSONFeature = {
  geometry: {
    coordinates: [number, number];
  };
  properties: TGeoJSONProperty;
};

export type TGeoJSONProperty = {
  name: string;
  postcode: string;
  id: string;
  city: string;
};
