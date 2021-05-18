import React, {useCallback, useRef, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, Text, Pressable} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useTranslation, Translation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {langSelectorState} from '../atoms';

interface LanguageItem {
  label: string;
  caption: string;
  value: string;
}

interface LanguageSelectorProps {
  items: LanguageItem[];
}

const keyExtractor = (item: LanguageItem, index: number) =>
  `lang:${item.value}:${index}`;

const ItemSeparator = () => <View style={styles.separator} />;

const LanguageSelector = ({items}: LanguageSelectorProps) => {
  const modalize = useRef<Modalize>(null);
  const {i18n} = useTranslation();
  const [langSelector, setLangSelector] = useRecoilState(langSelectorState);

  useEffect(() => {
    if (langSelector) {
      modalize.current?.open();
    }
  }, [langSelector]);

  const handleClose = useCallback(() => setLangSelector(false), []);

  const handleSelect = useCallback(
    (lang: string) => {
      return async () => {
        try {
          await i18n.changeLanguage(lang);
        } finally {
          modalize.current?.close();
        }
      };
    },
    [i18n],
  );

  const renderItem = useCallback(
    ({item}) => (
      <Pressable
        onPress={handleSelect(item.value)}
        style={styles.item}
        disabled={i18n.language === item.value}>
        <Text style={styles.itemTitle}>{item.label}</Text>
        <Text style={styles.itemCaption}>{item.caption}</Text>
      </Pressable>
    ),
    [i18n, handleSelect],
  );

  return (
    <Modalize
      adjustToContentHeight
      ref={modalize}
      onClosed={handleClose}
      HeaderComponent={
        <View style={styles.header}>
          <Translation>
            {(t) => <Text style={styles.headerTitle}>{t('langSelector')}</Text>}
          </Translation>
        </View>
      }
      modalStyle={styles.modalize}
      flatListProps={{
        data: items,
        extraData: i18n.language,
        renderItem: renderItem,
        keyExtractor: keyExtractor,
        ItemSeparatorComponent: ItemSeparator,
        bounces: false,
        showsVerticalScrollIndicator: false,
      }}
      FooterComponent={<SafeAreaView />}
    />
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({
  modalize: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  item: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  separator: {
    // backgroundColor: '#e5e5e5',
    height: 1,
  },
  itemTitle: {
    fontSize: 15,
    color: 'black',
  },
  itemCaption: {
    fontSize: 13,
    color: '#858585',
  },
});
