export type TrackingNumber = String;

export interface ITrackingsData {
  tracking_number: TrackingNumber;
  location_id: string;
  pickup_date: string;
}

export type TrackingDataMap = Map<TrackingNumber, ITrackingsData>;
