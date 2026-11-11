import type { IconType } from "react-icons";
import { FiCpu, FiLayers, FiMessageSquare, FiRefreshCw, FiShoppingBag, FiSmartphone } from "react-icons/fi";

/* One icon per service, shared by the service cards and the first screens. */
export const SERVICE_ICONS: Record<string, IconType> = {
  "ai-integration": FiCpu,
  "chatbots-assistants": FiMessageSquare,
  "crm-automation": FiRefreshCw,
  "web-apps": FiLayers,
  "ecommerce-payments": FiShoppingBag,
  "mobile-apps": FiSmartphone,
};
