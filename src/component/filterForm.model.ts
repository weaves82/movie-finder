export interface CertObject {
  order?: number;
  id: string;
  label: string;
}

export interface GenreObject {
  id: string;
  label: string;
}

export interface FilterPropsObj {
  certificates?: CertObject[];
  genres?: GenreObject[];
  year?: string;
}
export interface FilterProps {
  onChange: (obj: FilterPropsObj) => void;
  isReset: boolean;
}

export interface FilterArrayProps {
  id: string;
  label: string;
  order?: number;
}

export interface CheckboxProps {
  id: string;
  label: string;
  onChange: (
    id: string,
    isClicked: boolean,
    label: string,
    order?: number
  ) => void;
  isReset: boolean;
  order?: number;
}

export interface InputProps {
  id: string;
  label: string;
  onChange: (textInput: string) => void;
  isReset: boolean;
}
