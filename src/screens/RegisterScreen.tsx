import {yupResolver} from '@hookform/resolvers/yup';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker, {
  WindowsDatePickerChangeEvent,
} from '@react-native-community/datetimepicker';
import {differenceInYears, subYears} from 'date-fns';
import {capitalize} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, View} from 'react-native';
import styled, {css} from 'styled-components/native';
import * as yup from 'yup';
import ButtonNormal from '~/components/Button/ButtonNormal';
import ButtonText from '~/components/Button/ButtonText';
import {SafeAreaView} from '~/components/common';
import FormGroup from '~/components/Form/FormGroup';
import Radio from '~/components/Form/Radio';
import Container from '~/components/Layout/Container';
import Loading from '~/components/Loading/Loading';
import Logo from '~/components/Logo';
import Text from '~/components/Text';
import {ENVIRONMENT} from '~/config/constants';
import {
  AppStackScreens,
  LoadingStatus,
  RequestError,
  RootStackScreens,
} from '~/config/types';
import api from '~/core/api';
import {UserType} from '~/core/entity/common';
import useAuth from '~/hooks/useAuth';
import useFeedback from '~/hooks/useFeedback';
import useNavigate from '~/hooks/useNavigate';
import useTheme from '~/hooks/useTheme';
import {format} from '~/utils/date';
import {capitalizeByIndex} from '~/utils/string';

const today = new Date();
interface FormData {
  name: string;
  email: string;
  birthdate: Date;
  password: string;
  userType: UserType;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(10, 'O nome deve conter no mínimo 10 caracteres.')
    .required('Informação obrigatória.'),
  email: yup
    .string()
    .email('Email inválido.')
    .required('Informação obrigatória.'),
  birthdate: yup
    .date()
    .test(
      'age',
      'Sua idade deve ser superior a 18 anos.',
      (value) => !!value && differenceInYears(new Date(), value) > 18,
    ),
  password: yup
    .string()
    .min(8, 'A Senha deve conter no mínimo 8 caracteres.')
    .required('Informação obrigatória.'),
  userType: yup
    .string()
    .required('Informação obrigatória.')
    .oneOf([UserType.MUSICIAN, UserType.PROMOTER]),
  terms: yup.bool().required(),
});

const defaultValues = ENVIRONMENT.isDev
  ? {
      name: 'Jeconias Santos',
      email: 'musicando@musicando.com',
      birthdate: new Date(1980, 0, 17),
      password: '@Senha123',
      userType: UserType.MUSICIAN,
      terms: false,
    }
  : {
      name: '',
      email: '',
      birthdate: undefined,
      password: '',
      userType: UserType.MUSICIAN,
      terms: false,
    };

const RegisterScreen = () => {
  const {to} = useNavigate();
  const {handleUpdate} = useAuth();
  const {feedback} = useFeedback();
  const {theme} = useTheme();

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [loading, setLoading] = useState<LoadingStatus>('idle');

  const {
    control,
    handleSubmit,
    setValue,
    errors,
    watch,
    register,
    reset,
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const {terms, userType, birthdate} = watch();

  const handleDatePicker = useCallback(
    (_: WindowsDatePickerChangeEvent, date?: Date) => {
      setValue('birthdate', date, {shouldValidate: true});
      setShowDateTimePicker(false);
    },
    [setValue, setShowDateTimePicker],
  );

  const handleSelectUserType = useCallback(
    (user: UserType) => {
      if (user !== userType) setValue('userType', user, {shouldValidate: true});
    },
    [setValue, userType],
  );

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading('loading');

      try {
        const nickName = data.name.split(' ');

        const response = await api.user.create({
          name: data.name,
          nickName: nickName.length > 0 ? nickName[0] : data.name,
          email: data.email,
          password: data.password,
          birthdate: format(data.birthdate, 'yyyy-MM-dd'),
          phoneNumber: '84994381350',
          description: 'NONE',
          userType: data.userType,
        });

        if (response.data.status) {
          reset({
            name: '',
            email: '',
            birthdate: undefined,
            password: '',
            terms: false,
          });
          handleUpdate({email: data.email});
          feedback({
            message: 'Cadastro realizado com sucesso!',
            type: 'success',
          });
          setLoading('ok');
          to(AppStackScreens.Login);
        } else {
          //TODO(Jeconias): Solve it.
        }
      } catch (e) {
        const error: RequestError = e;
        const message =
          error.response?.data.message ??
          'Ops! Tivemos um problema inesperado.';

        feedback({
          message,
          type: 'danger',
        });
        setLoading('idle');
      }
    },
    [setLoading, handleUpdate, feedback, reset, to],
  );

  const hasError = !!Object.keys(errors ?? {}).length;

  const isLoading = loading === 'loading';

  useEffect(() => {
    register('terms');
    register('userType');
    register('birthdate');
  }, [register]);

  return (
    <SafeAreaView>
      <Container>
        <Logo />
        <Form>
          <Controller
            name="name"
            control={control}
            render={({onChange, onBlur, value}) => (
              <FormGroup
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Nome Completo"
                placeholderTextColor={theme.colors.text}
                keyboardType="default"
                icon="user"
                error={errors?.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({onChange, onBlur, value}) => (
              <FormGroup
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Email"
                placeholderTextColor={theme.colors.text}
                keyboardType="email-address"
                icon="email"
                error={errors?.email?.message}
              />
            )}
          />

          <FormGroup
            value={`${capitalizeByIndex(
              format(birthdate ?? today, 'dd MMMM yyyy'),
              3,
            )}`}
            onFocus={() => {
              Keyboard.dismiss();
              setShowDateTimePicker(true);
            }}
            placeholder="Data de Nascimento"
            placeholderTextColor={theme.colors.text}
            showSoftInputOnFocus={false}
            icon="calendar"
            error={errors?.birthdate?.message}
          />

          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({onChange, onBlur, value}) => (
              <FormGroup
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Senha"
                placeholderTextColor={theme.colors.text}
                secureTextEntry={true}
                icon="key"
                error={errors?.password?.message}
              />
            )}
          />
          <UserTypeWrapper>
            <View>
              <Text size="sm">Tipo de perfil</Text>
            </View>
            <Flex>
              <CustomRadio
                value={UserType.MUSICIAN}
                isChecked={userType === UserType.MUSICIAN}
                onSelected={handleSelectUserType}>
                Músico
              </CustomRadio>
              <Radio
                value={UserType.PROMOTER}
                isChecked={userType === UserType.PROMOTER}
                onSelected={handleSelectUserType}>
                Promotor
              </Radio>
            </Flex>
          </UserTypeWrapper>

          <Terms>
            <CheckBox
              disabled={isLoading}
              value={terms}
              onValueChange={(value: boolean) =>
                setValue('terms', value, {shouldValidate: true})
              }
              tintColors={{
                false: theme.colors.text,
                true: theme.colors.primary,
              }}
            />
            <Text size="xs" color="text">
              Li e concordo com os{' '}
            </Text>
            <ButtonText
              size="xs"
              color="white"
              onPress={() => to(RootStackScreens.ModalTerms)}>
              TERMOS
            </ButtonText>
          </Terms>

          <CustomButtonNormal
            onPress={handleSubmit(onSubmit)}
            disabled={hasError || !terms || isLoading}>
            {isLoading ? <Loading /> : 'Concluir'}
          </CustomButtonNormal>

          {showDateTimePicker && (
            <DateTimePicker
              value={birthdate ?? today}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDatePicker as any}
              maximumDate={subYears(today, 18)}
            />
          )}
        </Form>
      </Container>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const Form = styled(View)`
  position: relative;
`;

const CustomButtonNormal = styled(ButtonNormal)`
  ${({theme}) => css`
    margin-top: ${theme.spacing.lg};
  `}
`;

const Terms = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    padding-top: ${theme.spacing.md}
    margin-bottom: ${theme.spacing.xxs};
  `}
`;

const UserTypeWrapper = styled.View`
  ${({theme}) => css`
    padding: 0 ${theme.spacing.xs};
  `}
`;

const Flex = styled.View`
  ${({theme}) => css`
    padding-top: ${theme.spacing.xs};
    flex-direction: row;
  `}
`;

const CustomRadio = styled(Radio)`
  ${({theme}) => css`
    margin-right: ${theme.spacing.sm};
  `}
`;
