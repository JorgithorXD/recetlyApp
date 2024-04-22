import React, { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import useDynamicStyles from "../components/styles/genericStyles"
import { Button } from "../components/ui/buttons/Button"
import MainLayout from "../components/ui/layouts/MainLayout"
import LoadingProfile from "../components/ui/loading/UserProgileLoading"
import IsLoggedIn from "../utils/authUtil"
import RecipeCard from "../components/ui/RecipeCard"
import { Anchor } from "../components/ui/buttons/AnchorButton"
import { useIsFocused } from "@react-navigation/native"
import NoAccountNotification from "../components/ui/notifications/NoAccount"

export default function UserProfile({ navigation }) {
    const [userData, setUserData] = useState()
    const [loadingUserData, setLoadingUserData] = useState(false)
    const [id, setId] = useState()
    const [favRecipes, setFavRecipes] = useState()
    const [recipes, setRecipes] = useState([])
    const [loadingRecipes, setLoadingRecipes] = useState(false)
    const [isLogged, setLogged] = useState()

    const [reloadFlag, setReloadFlag] = useState(false)
    const isFocused = useIsFocused()

    const theme = useDynamicStyles()

    async function IsLogged() {
        setLoadingUserData(true)
        try {
            const Data = await IsLoggedIn()
            setUserData(Data.UserData)
            setId(Data.ID)
            setLogged(Data.IsLogged)

            setLoadingUserData(false)
        } catch (error) {
            console.log(error)
        }
    }

    async function getRecipes() {
        setLoadingRecipes(true)
        try {
            const Data = await IsLoggedIn()
            setRecipes(Data.UserRecipes)

            setLoadingRecipes(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isFocused) {
            IsLogged()
            setReloadFlag(prevState => !prevState)
        }
        getRecipes()
    }, [isFocused])

    const styles = StyleSheet.create({
        image: {
            borderRadius: 65,
            alignSelf: 'center',
        },
        userPersonalData: {
            borderRadius: 15,
            padding: 15,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.intermediateColor
        },
        textUserName: {
            fontSize: 32,
            fontWeight: '500',
            color: theme.textColor
        },
        textName: {
            fontSize: 22,
            fontWeight: '400',
            color: theme.textColor
        },
        container: {
            padding: 10,
        },
        sectionTitle: {
            fontSize: 28,
            fontWeight: '400',
            color: theme.textColor
        }
    })

    if (!userData || loadingUserData) {
        return (
            <MainLayout>
                <LoadingProfile />
            </MainLayout>
        )
    }

    if (!isLogged) {
        return (
            <MainLayout>
                <NoAccountNotification />
            </MainLayout>
        )
    }

    return (
        <MainLayout Title={"Perfil"}>
            <ScrollView style={{ flex: 1, ...styles.container }}>
                <View style={{ width: '100%', aspectRatio: 16 / 6, backgroundColor: userData.user.user_color ? userData.user.user_color : theme.intermediateColor, zIndex: 1, borderRadius: 8, marginBottom: 8 }} >
                    {userData && (
                        <Image
                            style={{ ...styles.image, position: 'absolute', bottom: -45, zIndex: 2, right: 20 }}
                            source={{ uri: userData.user.user_pfp }}
                            width={130}
                            height={130}
                            resizeMode={'contain'}
                        />
                    )}
                </View>

                <View style={[styles.userPersonalData]}>
                    {userData && (
                        <View>
                            <Text style={styles.textUserName}>{userData.user.user_username}</Text>
                            <Text style={styles.textName}>{userData.user.user_name + " " + userData.user.user_last_name}</Text>
                        </View>
                    )}
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', gap: 8, marginVertical: 16, marginBottom: 8 }}>
                    <Button
                        ButtonText="Editar perfil"
                        style={{ backgroundColor: theme.mainButton, flex: 1, height: 45 }}
                        TextStyle={{ color: theme.textColor, fontSize: 24 }}
                        onPress={() => navigation.navigate('EditProfileScreen', { data: userData, uID: id })}
                    />
                    <Button
                        ButtonText="Agregar receta"
                        style={{ backgroundColor: theme.intermediateColor, flex: 1, height: 45 }}
                        TextStyle={{ color: theme.textColor, fontSize: 24 }}
                    />
                </View>

                <Text style={{ ...styles.sectionTitle, marginBottom: 4 }}>Sobre mi</Text>
                <View style={{ ...styles.userPersonalData, marginBottom: 8 }}>
                    <Text style={{ fontSize: 18, color: theme.textColor }}>{userData.user.user_description ? userData.user.user_description : "Sin descripcion"}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', flex: 1, marginBottom: 8 }}>
                    <Text style={{ ...styles.sectionTitle, flex: 1 }}>Recetas</Text>
                    <Anchor
                    onPress={()=>navigation.navigate('MyRecipes')}
                        ButtonText="Ver todas"
                        TextStyle={{ ...styles.sectionTitle, fontSize: 20, textDecorationLine: 'underline' }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
                    {
                        recipes.length == 0
                            ? (<Text style={{ color: theme.textColor, fontSize: 18 }}>El usuario no tiene recetas</Text>)
                            : ((recipes).slice(0, 4)).map(recipe => {
                                return (
                                    <RecipeCard key={recipe.id} recipe={recipe} navigation={navigation} />
                                )
                            })
                    }
                </View>

            </ScrollView>
        </MainLayout>
    )
}
