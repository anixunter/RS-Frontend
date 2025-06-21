export type UserDetail = {
  id: string;
  employee_id: number;
  username: string;
  email: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  date_joined: string;
  full_name: string;
  dolphin_user: any | null;
  is_active: boolean;
  first_login: boolean;
  avatar: string;
  is_employee: boolean;
  user_detail: {
    id: string;
    gender: string;
    dob: string;
    department: {
      id: number;
      name: string;
    };
    designation: {
      id: number;
      name: string;
    };
    active_level: any[];
    contact_number: string;
    province: any | null;
    municipality: any | null;
    zip_code: any | null;
    address: any[] | null;
  };
  allowed_departments: {
    id: number;
    name: string;
  }[];
  employee_contracts: any[];
  roles: {
    id: number;
    name: string;
    permissions: {
      id: number;
      name: string;
      category: string;
    }[];
  }[];
  department: string;
  designation: string;
};
