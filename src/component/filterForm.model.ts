export interface certObject {
  order?: number;
  id: string;
  label: string;
}

export interface genreObject {
  id: string;
  label: string;
}

interface filterPropsObj {
  certificates?: certObject[];
  genres?: genreObject[];
  year?: string;
}
export interface filterProps {
  onChange: (obj: filterPropsObj) => void;
  isReset: boolean;
}

export interface filterArrayProps {
  id: string;
  label: string;
  order?: number;
}

export interface checkboxProps {
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

export interface inputProps {
  id: string;
  label: string;
  onChange: (textInput: string) => void;
  isReset: boolean;
}
