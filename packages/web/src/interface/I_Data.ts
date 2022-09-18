export interface RecordDataDateProps {
  nanoseconds: number;
  seconds: number;
}

export interface RecordDataProps {
  DATE: RecordDataDateProps;
  DIA: number;
  PULSE: number;
  SYS: number;
  SUGAR?: number;
}
