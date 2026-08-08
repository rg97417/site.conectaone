/**
 * GlobalSchemas Component
 *
 * Adds Organization and LocalBusiness schemas to all pages
 * These schemas enhance E-E-A-T signals and local SEO
 *
 * Usage: Add to App.tsx or main layout component
 */

import { Helmet } from 'react-helmet-async';
import { getOrganizationSchema, getLocalBusinessSchema } from '@/utils/enhancedSchemas';

const GlobalSchemas = () => {
  const organizationSchema = getOrganizationSchema();
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <Helmet>
      {/* Organization Schema - Global E-E-A-T */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* LocalBusiness Schema - Local SEO */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default GlobalSchemas;
