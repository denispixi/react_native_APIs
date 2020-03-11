import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, SectionList, TouchableOpacity, SafeAreaView, Vibration } from 'react-native'
import * as Contacts from 'expo-contacts'
import * as Haptics from 'expo-haptics';
import Modal from 'react-native-modal'

type ContactModalProps = {
  selectedContact: Contacts.Contact
  onBackdropPress: () => void
  isVisible: boolean
}

function ContactModal({ selectedContact, isVisible, onBackdropPress }: ContactModalProps) {
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={styles.detailModal}
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}>

      {selectedContact ? <View style={styles.detail}>
        {selectedContact.image ?
          <Image
            source={{ uri: selectedContact.image.uri }}
            style={styles.contactAvatarModal}
            resizeMode="contain"
          /> :
          <View style={[styles.contactAvatarModal, { backgroundColor: '#999' }]}>
            <Text style={{ fontSize: 50, color: 'white' }}>
              {selectedContact.firstName[0]}
            </Text>
          </View>}
        <View style={{ marginTop: 40 }} />
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
          {`${selectedContact.firstName || ''} ${selectedContact.lastName || ''}`}
        </Text>

        <Text style={{ fontSize: 25 }}>
          {(selectedContact.phoneNumbers && selectedContact.phoneNumbers[0].number) || ''}
        </Text>

      </View> : <View />}
    </Modal>
  )
}

function ContactsScreen() {
  const [contacts, setContacts] = useState([])
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contacts.Contact>(null)

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Emails,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Image,
          ],
        })
        const contactsData = data
          .sort((a, b) => a.firstName > b.firstName ? 1 : -1)
          .reduce((acc, item, _idx, contactList): { title: string, data: any[] }[] => {
            if (!item.firstName || !item.firstName[0])
              return acc
            const title = item.firstName[0]
            if (acc.some(item => item.title === title))
              return acc
            const words = contactList.filter(x => x.firstName[0] === item.firstName[0])
            return [...acc, { title, data: words }]
          }, [])
        setContacts(contactsData)
      }
    })()
  }, [])

  const showDetailModal = (contact: Contacts.Contact) => () => {
    try {
      setSelectedContact(contact)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      setDetailModalVisible(true)
    } catch (error) {
      console.log({ error })
    }
  }

  const dismissDetailModal = () => {
    setDetailModalVisible(false)
    setSelectedContact(null)
  }

  const renderSectionHeader = ({ section: { title } }: any) => {
    return <Text style={styles.header}>{title}</Text>
  }

  const renderContact = ({ item: contact }: { item: Contacts.Contact }) => {
    return (
      <TouchableOpacity
        delayLongPress={200}
        onLongPress={showDetailModal(contact)}
        style={styles.contactTile}>

        {contact.image ?
          <Image
            source={{ uri: contact.image.uri }}
            style={styles.contactAvatar}
            resizeMode="contain"
          /> :
          <View style={[styles.contactAvatar, { backgroundColor: '#999' }]}>
            <Text style={{ fontSize: 30, color: 'white' }}>
              {contact.firstName[0]}
            </Text>
          </View>}

        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>

          {/* Nombre */}
          <Text style={styles.contactName}>
            {`${contact.firstName || ''} ${contact.lastName || ''}`}
          </Text>

          {/* Telefono */}
          <Text style={styles.contactPhone}>
            {(contact.phoneNumbers && contact.phoneNumbers[0].number) || ''}
          </Text>

        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <SectionList
        sections={contacts}
        renderItem={renderContact}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id}
        ListFooterComponent={<View style={{ height: 50 }} />}
      />
      <ContactModal
        isVisible={detailModalVisible}
        onBackdropPress={dismissDetailModal}
        selectedContact={selectedContact}
      />
    </View>
  )
}


// ESTILOS
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#EFEFEF',
    fontSize: 20,
    fontWeight: "bold",
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 17
  },
  contactTile: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
    height: 70,
    borderColor: '#DDD',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white'
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactAvatarModal: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444'
  },
  contactPhone: {
    fontSize: 16,
    marginVertical: 3,
    color: '#444'
  },
  detailModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '80%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20
  }
})

export default ContactsScreen