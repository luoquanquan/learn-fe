import type { Route } from "./+types/encrypt";
import Encrypt from "../pages/encrypt";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Encrypt" }];
}

export default function EncryptPage() {
  return <Encrypt />;
}
