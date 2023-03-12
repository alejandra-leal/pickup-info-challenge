export type LocationId = String;

export interface IPickupLocationData {
  location_id: LocationId;
  latitude: string;
  longitude: string;
}

export type PickupLocationDataMap = Map<LocationId, IPickupLocationData>;
