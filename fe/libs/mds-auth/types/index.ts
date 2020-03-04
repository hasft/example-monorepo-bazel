export type MdsAuthParsed = {
  status: "unknown" | "guest" | "with_thor" | "without_thor";
  isExpired: boolean;
  isVerified: boolean;
  token: {
    matahari: string | null;
    ovo: string | null;
  };
};
