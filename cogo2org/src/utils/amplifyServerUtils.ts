import { createServerRunner } from '@aws-amplify/adapter-nextjs';

import awsExports from "@/utils/config"

export const { runWithAmplifyServerContext } = createServerRunner({
  config: awsExports
});