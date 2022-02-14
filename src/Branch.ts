export type CustomerSegmentType =
  | 'Business'
  | 'Corporate'
  | 'Other'
  | 'Personal'
  | 'Private'
  | 'Premier'
  | 'Select'
  | 'SME'
  | 'Wealth';

export type ServiceAndFacilityType =
  | 'AssistedServiceCounter'
  | 'ExternalATM'
  | 'AccountVerificationService'
  | 'BusinessCounter'
  | 'BureauDeChange'
  | 'BusinessDepositTerminal'
  | 'BusinessITSupport'
  | 'CardIssuanceFacility'
  | 'CollectionLockers'
  | 'CounterServices'
  | 'ExternalQuickServicePoint'
  | 'InternalQuickServicePoint'
  | 'InternalATM'
  | 'LodgementDevice'
  | 'MortgageAdvisor'
  | 'MeetingRooms'
  | 'NightSafe'
  | 'OnlineBankingPoint'
  | 'OnDemandCurrency'
  | 'Other'
  | 'Parking'
  | 'PremierCounter'
  | 'QuickDeposit'
  | 'SaturdayCounterService'
  | 'StatementPrinter'
  | 'SelfServiceAccountOpening'
  | 'VideoBanking'
  | 'WiFi';

type AccessibilityType =
  | 'AutomaticDoors'
  | 'AudioCashMachine'
  | 'ExternalRamp'
  | 'HelpingHandUnit'
  | 'InductionLoop'
  | 'InternalRamp'
  | 'LevelAccess'
  | 'LowerLevelCounter'
  | 'Other'
  | 'WheelchairAccess';

type OtherItem = {
  Name: string;
  Description: string;
  Code?: string;
};

type AvailableDay = {
  Name:
    | 'Friday'
    | 'Monday'
    | 'Saturday'
    | 'Sunday'
    | 'Thursday'
    | 'Tuesday'
    | 'Wednesday';
  OpeningHours: {
    OpeningTime: string;
    ClosingTime: string;
  }[];
  Notes?: string;
};

type ContactMethod = {
  ContactType:
    | 'AlternateEmail'
    | 'AlternateFax'
    | 'AlternatePhone'
    | 'Email'
    | 'Fax'
    | 'Other'
    | 'Phone';
  ContactContent: string;
  ContactDescription?: string;
  OtherContactType?: OtherItem;
};

export type Branch = {
  Identification: string;
  SequenceNumber: string;
  Name?: string;
  Type: 'Mobile' | 'Physical';
  SortCode?: string[];
  Photo?: string;
  CustomerSegment: CustomerSegmentType[];
  ServiceAndFacility?: ServiceAndFacilityType[];
  Accessibility?: AccessibilityType[];
  OtherCustomerSegment?: OtherItem[];
  OtherAccessibility?: OtherItem[];
  OtherServiceAndFacility?: OtherItem[];
  Availability?: {
    StandardAvailability: {
      Day: AvailableDay[];
    };
    NonStandardAvailability?: {
      Name: string;
      StartDate: string;
      EndDate: string;
      Notes: string;
      Day: AvailableDay[];
    };
  };
  ContactInfo?: ContactMethod[];
  PostalAddress: {
    AddressLine?: string[];
    BuildingNumber?: string;
    StreetName?: string;
    TownName?: string;
    CountrySubDivision?: string[];
    Country?: string;
    PostCode: string;
    GeoLocation?: {
      GeographicCoordinates: {
        Latitude: string;
        Longitude: string;
      };
    };
  };
};

export const branchAddress = (b: Branch) =>
  [
    b.PostalAddress.BuildingNumber,
    b.PostalAddress.StreetName,
    b.PostalAddress.TownName,
    b.PostalAddress.PostCode,
  ]
    .filter((l) => !!l)
    .join(', ');
