import {Platform} from 'react-native';

export default function uiKittenMappingForAndroid(mapping) {
  return Platform.OS !== 'android'
    ? mapping
    : {
        ...mapping,
        strict: {
          ...(mapping?.strict ?? {}),
          'text-heading-1-font-weight': 'normal',
          'text-heading-2-font-weight': 'normal',
          'text-heading-3-font-weight': 'normal',
          'text-heading-4-font-weight': 'normal',
          'text-heading-5-font-weight': 'normal',
          'text-heading-6-font-weight': 'normal',
          'text-subtitle-1-font-weight': 'normal',
          'text-subtitle-2-font-weight': 'normal',
          'text-paragraph-1-font-weight': 'normal',
          'text-paragraph-2-font-weight': 'normal',
          'text-caption-1-font-weight': 'normal',
          'text-caption-2-font-weight': 'normal',
          'text-label-font-weight': 'normal',
        },
        components: {
          ...(mapping?.components ?? {}),
          Button: {
            ...(mapping?.components?.Button ?? {}),
            appearances: {
              ...(mapping?.components?.Button?.appearances ?? {}),
              filled: {
                ...(mapping?.components?.Button?.appearances?.filled ?? {}),
                variantGroups: {
                  ...(mapping?.components?.Button?.appearances?.filled
                    ?.variantGroups ?? {}),
                  size: {
                    ...(mapping?.components?.Button?.appearances?.filled
                      ?.variantGroups?.size ?? {}),
                    tiny: {
                      ...(mapping?.components?.Button?.appearances?.filled
                        ?.variantGroups?.size?.tiny ?? {}),
                      textFontWeight: 'normal',
                    },
                    small: {
                      ...(mapping?.components?.Button?.appearances?.filled
                        ?.variantGroups?.size?.small ?? {}),
                      textFontWeight: 'normal',
                    },
                    medium: {
                      ...(mapping?.components?.Button?.appearances?.filled
                        ?.variantGroups?.size?.medium ?? {}),
                      textFontWeight: 'normal',
                    },
                    large: {
                      ...(mapping?.components?.Button?.appearances?.filled
                        ?.variantGroups?.size?.large ?? {}),
                      textFontWeight: 'normal',
                    },
                    giant: {
                      ...(mapping?.components?.Button?.appearances?.filled
                        ?.variantGroups?.size?.giant ?? {}),
                      textFontWeight: 'normal',
                    },
                  },
                },
              },
            },
          },
          Tab: {
            ...(mapping?.components?.Tab ?? {}),
            appearances: {
              ...(mapping?.components?.Tab?.appearances ?? {}),
              default: {
                ...(mapping?.components?.Tab?.appearances?.default ?? {}),
                mapping: {
                  ...(mapping?.components?.Tab?.appearances?.default?.mapping ??
                    {}),
                  textFontWeight: 'normal',
                },
              },
            },
          },
        },
      };
}
