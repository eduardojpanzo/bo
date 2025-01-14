"use client";

import { gettingData, settingData } from "@/lib/fecth";
import { ProfileModel } from "@/models/profile.model";
import { createSession, deleteSession, getSession } from "@/utils/session";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContextProps {
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  profile: ProfileModel | null;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileModel | null>(null);

  const fecthProfile = async () => {
    try {
      const data = await gettingData<ProfileModel>(ProfileModel.ENDPOINT);
      setToken(token);
      setProfile(data);
    } catch {
      setToken(null);
    }
  };

  const login = async (email: string, senha: string) => {
    const response = await settingData<HttpResponseDataType<LoginResponse>>(
      "/login",
      JSON.stringify({
        email,
        senha,
      })
    );

    await createSession(email, response.data.token);

    setToken(token);
  };

  const logout = () => {
    deleteSession();
    navigate(`/`);
  };

  useEffect(() => {
    let hastoken = false;
    getSession().then((v) => {
      if (v?.token) {
        setToken(v?.token);
        hastoken = true;
      }
    });

    if (!hastoken) return;

    fecthProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, profile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return authContext;
};
