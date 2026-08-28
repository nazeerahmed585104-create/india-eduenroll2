/**
 * Utility for generating and validating Schema.org JSON-LD structured data
 * based on Institution, Course, Exam, and Education Profile details.
 */

import { SchemaType } from '../types/seoPlatform';

export interface GenerateSchemaOptions {
  entityType?: 'college' | 'university' | 'course' | 'exam' | 'school' | 'coaching';
  schemaType?: SchemaType;
  canonicalUrl?: string;
  metaDescription?: string;
  customFaqs?: Array<{ question: string; answer: string }>;
}

/**
 * Generate compliant Schema.org JSON-LD string based on an entity profile object
 */
export function generateJsonLdFromProfile(
  entity: any,
  options: GenerateSchemaOptions = {}
): string {
  if (!entity) return '{}';

  const entityType = options.entityType || (entity.coursesOffered ? (entity.type?.includes('University') ? 'university' : 'college') : 'college');
  const schemaType = options.schemaType || (
    entityType === 'university' ? 'CollegeOrUniversity' :
    entityType === 'college' ? 'CollegeOrUniversity' :
    entityType === 'course' ? 'Course' :
    entityType === 'exam' ? 'Event' :
    entityType === 'school' ? 'EducationalOrganization' :
    'EducationalOrganization'
  );

  const baseUrl = options.canonicalUrl || entity.canonicalUrl || `https://eduplatform.example/${entityType}/${entity.slug || 'profile'}`;
  const description = options.metaDescription || entity.metaDescription || entity.overview || entity.courseDescription || `${entity.name || 'Institution'} official profile and admissions guide.`;
  const name = entity.name || entity.courseName || entity.examName || 'Education Entity';

  let schemaObj: any = {
    '@context': 'https://schema.org'
  };

  // 1. FAQPage Schema
  if (schemaType === 'FAQPage') {
    const rawFaqs = options.customFaqs || entity.faqs || [
      {
        question: `What are the eligibility criteria for admissions at ${name}?`,
        answer: entity.eligibility || entity.admissionInfo?.eligibilityCriteria || 'Candidates must have passed 10+2 / Pre-University with relevant qualifying examination cutoff scores.'
      },
      {
        question: `What is the fee structure at ${name}?`,
        answer: entity.feeRange || entity.feesRange || entity.avgFees || 'Fee structure varies by specialization, quota, and scholarship merit tiers.'
      },
      {
        question: `What is the highest placement package recorded at ${name}?`,
        answer: entity.placements ? `The highest package reported is ₹${entity.placements.highestPackageLPA} LPA with an average package of ₹${entity.placements.averagePackageLPA} LPA.` : 'Top tier campus recruitments by leading tech & Fortune 500 organizations.'
      }
    ];

    schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': rawFaqs.map((f: any) => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.answer
        }
      }))
    };

    return JSON.stringify(schemaObj, null, 2);
  }

  // 2. Course Schema
  if (schemaType === 'Course' || entityType === 'course') {
    schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': name,
      'description': description,
      'url': baseUrl,
      'timeRequired': entity.duration || 'P4Y',
      'educationalCredentialAwarded': entity.degreeLevel || 'Bachelor of Technology (B.Tech)',
      'provider': {
        '@type': 'EducationalOrganization',
        'name': entity.collegesOffering?.[0] || 'EduPlatform Partner Universities',
        'url': baseUrl
      },
      'offers': {
        '@type': 'Offer',
        'category': 'Tuition',
        'price': entity.avgFees ? entity.avgFees.replace(/[^0-9]/g, '') || '180000' : '180000',
        'priceCurrency': 'INR',
        'availability': 'https://schema.org/InStock',
        'validFrom': '2026-01-01'
      },
      'occupationalCategory': entity.careerOptions || ['Software Engineer', 'Data Scientist', 'Solutions Architect'],
      'hasCourseInstance': {
        '@type': 'CourseInstance',
        'courseMode': 'Full-time, On-campus',
        'courseWorkload': entity.duration || '4 Academic Years'
      }
    };

    if (entity.syllabusHighlights && entity.syllabusHighlights.length > 0) {
      schemaObj['syllabusSections'] = entity.syllabusHighlights.map((s: string, idx: number) => ({
        '@type': 'Syllabus',
        'position': idx + 1,
        'name': s
      }));
    }

    return JSON.stringify(schemaObj, null, 2);
  }

  // 3. Event / Exam Schedule Schema
  if (schemaType === 'Event' || entityType === 'exam') {
    const upcomingDate = entity.importantDates?.[0]?.date || '2026-05-15';
    schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'EducationEvent',
      'name': `${name} 2026 Entrance Examination`,
      'description': description,
      'url': baseUrl,
      'startDate': upcomingDate,
      'endDate': upcomingDate,
      'eventStatus': 'https://schema.org/EventScheduled',
      'eventAttendanceMode': entity.examPattern?.mode?.includes('Online') 
        ? 'https://schema.org/OnlineEventAttendanceMode' 
        : 'https://schema.org/OfflineEventAttendanceMode',
      'organizer': {
        '@type': 'EducationalOrganization',
        'name': entity.conductingBody || 'National Testing Agency (NTA)',
        'url': baseUrl
      },
      'location': {
        '@type': 'Place',
        'name': 'Nationwide Examination Centers',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'IN'
        }
      },
      'offers': {
        '@type': 'Offer',
        'name': 'Exam Registration Fee',
        'price': '1700',
        'priceCurrency': 'INR',
        'availability': 'https://schema.org/InStock',
        'validThrough': '2026-04-10'
      }
    };

    return JSON.stringify(schemaObj, null, 2);
  }

  // 4. BreadcrumbList Schema
  if (schemaType === 'BreadcrumbList') {
    const defaultCrumbs = entity.breadcrumbs || [
      { label: 'Home', url: 'https://eduplatform.example' },
      { label: entityType === 'university' ? 'Universities' : entityType === 'college' ? 'Colleges' : 'Institutions', url: `https://eduplatform.example/${entityType}s` },
      { label: entity.location?.city || 'Bangalore', url: `https://eduplatform.example/${entityType}s/${(entity.location?.city || 'bangalore').toLowerCase()}` },
      { label: name, url: baseUrl }
    ];

    schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': defaultCrumbs.map((c: any, idx: number) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': c.label,
        'item': c.url
      }))
    };

    return JSON.stringify(schemaObj, null, 2);
  }

  // 5. Default: CollegeOrUniversity / EducationalOrganization (Institution Schema)
  const isUniversity = schemaType === 'CollegeOrUniversity' || entityType === 'university';
  const typeTag = isUniversity ? 'CollegeOrUniversity' : 'EducationalOrganization';

  schemaObj = {
    '@context': 'https://schema.org',
    '@type': typeTag,
    'name': name,
    'alternateName': entity.name ? `${entity.name.split(' ').map((w: string) => w[0]).join('')}` : undefined,
    'url': baseUrl,
    'description': description,
    'logo': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=300',
    'image': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    'foundingDate': entity.establishedYear ? `${entity.establishedYear}` : '1998',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': entity.location?.address || 'Campus Avenue, Knowledge City',
      'addressLocality': entity.location?.city || 'Bangalore',
      'addressRegion': entity.location?.state || 'Karnataka',
      'postalCode': entity.location?.pincode || '560001',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': entity.location?.coordinates?.lat || 12.9716,
      'longitude': entity.location?.coordinates?.lng || 77.5946
    },
    'telephone': entity.contact?.phone || '+91-80-2856-7000',
    'email': entity.contact?.email || 'admissions@eduplatform.example',
    'sameAs': [
      entity.contact?.website || 'https://www.official-institution.edu.in',
      `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`
    ]
  };

  // Add Accreditation / Rankings if present
  if (entity.naacGrade || entity.nirfRank) {
    schemaObj['hasCredential'] = {
      '@type': 'EducationalOccupationalCredential',
      'credentialCategory': 'Institutional Accreditation & Ranking',
      'name': [
        entity.naacGrade ? `NAAC Grade ${entity.naacGrade} Accredited` : null,
        entity.nirfRank ? `NIRF All-India Engineering Rank #${entity.nirfRank}` : null
      ].filter(Boolean).join(' • ')
    };
  }

  // Aggregate Rating & Reviews
  const avgRating = entity.reviews && entity.reviews.length > 0 
    ? (entity.reviews.reduce((acc: number, r: any) => acc + (r.rating || 4.5), 0) / entity.reviews.length).toFixed(1)
    : '4.7';
  const reviewCount = entity.reviews ? Math.max(entity.reviews.length * 18, 48) : 124;

  schemaObj['aggregateRating'] = {
    '@type': 'AggregateRating',
    'ratingValue': avgRating,
    'bestRating': '5',
    'worstRating': '1',
    'reviewCount': reviewCount
  };

  // Offer Catalog (Programs Offered)
  if (entity.coursesOffered && entity.coursesOffered.length > 0) {
    schemaObj['hasOfferCatalog'] = {
      '@type': 'OfferCatalog',
      'name': 'Degree Programs & Admissions 2026',
      'itemListElement': entity.coursesOffered.map((crs: string) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Course',
          'name': crs,
          'description': `Full-time degree program in ${crs} with industry specializations.`
        },
        'priceCurrency': 'INR',
        'price': entity.feeRange ? entity.feeRange.split('-')[0].replace(/[^0-9]/g, '') || '150000' : '150000'
      }))
    };
  }

  // Campus Amenities
  if (entity.facilities && entity.facilities.length > 0) {
    schemaObj['amenityFeature'] = entity.facilities.map((f: any) => ({
      '@type': 'LocationFeatureSpecification',
      'name': typeof f === 'string' ? f : f.name,
      'value': true
    }));
  }

  return JSON.stringify(schemaObj, null, 2);
}

/**
 * Validate JSON-LD String structure
 */
export function validateJsonLd(jsonString: string): {
  isValid: boolean;
  error?: string;
  warnings?: string[];
  stats: {
    type?: string;
    fieldsCount: number;
    hasContext: boolean;
    hasType: boolean;
    hasName: boolean;
    hasUrl: boolean;
  };
} {
  const stats = {
    type: undefined as string | undefined,
    fieldsCount: 0,
    hasContext: false,
    hasType: false,
    hasName: false,
    hasUrl: false
  };

  if (!jsonString || !jsonString.trim()) {
    return {
      isValid: false,
      error: 'JSON-LD payload is empty.',
      stats
    };
  }

  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {
        isValid: false,
        error: 'JSON-LD root must be a valid JSON Object.',
        stats
      };
    }

    stats.fieldsCount = Object.keys(parsed).length;
    stats.hasContext = Boolean(parsed['@context']);
    stats.hasType = Boolean(parsed['@type']);
    stats.type = parsed['@type'];
    stats.hasName = Boolean(parsed['name'] || parsed['mainEntity']);
    stats.hasUrl = Boolean(parsed['url'] || parsed['@id']);

    const warnings: string[] = [];

    if (!stats.hasContext || !parsed['@context'].includes('schema.org')) {
      warnings.push('Missing or invalid "@context". Standard should be "https://schema.org".');
    }

    if (!stats.hasType) {
      return {
        isValid: false,
        error: 'Missing required "@type" declaration (e.g. "CollegeOrUniversity", "Course", "FAQPage").',
        stats
      };
    }

    if (parsed['@type'] !== 'FAQPage' && !parsed['name']) {
      warnings.push('Recommended property "name" is missing.');
    }

    if (parsed['@type'] === 'FAQPage' && (!parsed['mainEntity'] || !Array.isArray(parsed['mainEntity']))) {
      return {
        isValid: false,
        error: 'FAQPage schema must contain a "mainEntity" array of Question objects.',
        stats
      };
    }

    return {
      isValid: true,
      warnings: warnings.length > 0 ? warnings : undefined,
      stats
    };
  } catch (err: any) {
    return {
      isValid: false,
      error: `Syntax Error: ${err.message}`,
      stats
    };
  }
}
