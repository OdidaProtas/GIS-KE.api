

import { RegionRoutes } from "./entity/Region";
import { CountyRoutes } from "./entity/County";
import { ConstituencyRoutes } from "./entity/Constituency";
import { WardRoutes } from "./entity/Ward";
import { FeaturesRoutes } from "./entity/Features";
import { SubcountyRoutes } from "./entity/Subcounty";
import { UserRoutes } from "./entity/User";
import { FeatureCategoryRoutes } from "./entity/FeatureCategory";
import registerRoutes from "./helpers/registerRoutes";
import { MpesaRoutes } from "./controller/Mpesa"
import { AuthRoutes } from "./controller/Auth"
// All routes registered here will be available on the API
export const Routes = registerRoutes(
  [
AuthRoutes,
MpesaRoutes,
RegionRoutes,
CountyRoutes,
ConstituencyRoutes,
WardRoutes,
FeaturesRoutes,
SubcountyRoutes,
UserRoutes,
FeatureCategoryRoutes
  ]
)
