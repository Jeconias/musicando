import {yupResolver} from '@hookform/resolvers/yup';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled, {css, useTheme} from 'styled-components/native';
import * as yup from 'yup';
import {authentication} from '~/core/api/api.auth';
import ButtonNormal from '~/components/Button/ButtonNormal';
import ButtonText from '~/components/Button/ButtonText';
import {fonts, SafeAreaView} from '~/components/common';
import FormGroup from '~/components/Form/FormGroup';
import Container from '~/components/Layout/Container';
import Loading from '~/components/Loading/Loading';
import Logo from '~/components/Logo';
import Text from '~/components/Text';
import {
  AppStackScreens,
  LoadingStatus,
  RequestError,
  RootStackScreens,
} from '~/config/types';
import useNavigate from '~/hooks/useNavigate';
import useAuth from '~/hooks/useAuth';
import useFeedback from '~/hooks/useFeedback';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido.')
    .required('Informação obrigatória.'),
  password: yup
    .string()
    .min(8, 'A Senha deve conter no mínimo 8 caracteres.')
    .required('Informação obrigatória.'),
});

const LoginScreen = () => {
  const theme = useTheme();
  const {user, handleOnSuccess} = useAuth();
  const {feedback} = useFeedback();
  const {to} = useNavigate();

  const [loading, setLoading] = useState<LoadingStatus>('idle');

  const {
    control,
    handleSubmit,
    errors,
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email ?? '',
      password: '',
    },
  });

  const {email, password} = watch();

  const handleAuthentication = useCallback(
    async (data: FormData) => {
      setLoading('loading');

      try {
        const resp = await authentication(data);
        if (resp.data.status) {
          handleOnSuccess(resp.data);
        } else {
          //TODO(Jeconias): Solve it.
          console.error('Login - Error');
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
    [handleOnSuccess, feedback],
  );

  const handlePasswordRecovery = useCallback(() => {
    schema.fields.email.isValid(email).then((isValid) => {
      if (isValid) {
        feedback({
          message: 'Enviamos um link de recuperação.',
          type: 'success',
        });
        clearErrors('email');
      } else {
        setError('email', {
          type: 'validate',
          message: 'Email inválido.',
        });
      }
    });
  }, [email, feedback, setError, clearErrors]);

  useEffect(() => {
    if (user?.email && !email)
      setValue('email', user.email, {shouldValidate: true});
  }, [user, setValue]);

  const isLoading = loading === 'loading';

  return (
    <SafeAreaView>
      <Container>
        <Logo />
        <Switch>
          <TouchableOpacity>
            <FirstOption size="sm" isSelected={true}>
              Login
            </FirstOption>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => to(RootStackScreens.ModalRegister)}>
            <SecondOption size="sm">Cadastro</SecondOption>
          </TouchableOpacity>
        </Switch>
        <Form>
          <WrapperInputs>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({onChange, onBlur, value}) => (
                <FormGroup
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  placeholder="Email"
                  icon="email"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  editable={!isLoading}
                  placeholderTextColor={theme.colors.text}
                  error={errors?.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              defaultValue=""
              control={control}
              render={({onChange, onBlur, value}) => (
                <FormGroup
                  textContentType="password"
                  placeholder="Senha"
                  icon="key"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  editable={!isLoading}
                  placeholderTextColor={theme.colors.text}
                  secureTextEntry={true}
                  error={errors?.password?.message}
                />
              )}
            />
          </WrapperInputs>
          <RightText>
            <ButtonText
              disabled={isLoading}
              size="xs"
              color="text"
              onPress={handlePasswordRecovery}>
              Esqueceu sua senha?
            </ButtonText>
          </RightText>
          <ButtonNormal
            disabled={isLoading || !email || !password}
            onPress={handleSubmit(handleAuthentication)}>
            {isLoading ? <Loading /> : 'Entrar'}
          </ButtonNormal>
        </Form>
        <AccessWithoutAccount>
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => to(AppStackScreens.Opportunities)}>
            <Text size="sm" color="text">
              Acessar sem conta
            </Text>
          </TouchableOpacity>
        </AccessWithoutAccount>
      </Container>
    </SafeAreaView>
  );
};

export default LoginScreen;

const WrapperInputs = styled(View)`
  padding-top: ${({theme}) => theme.spacing.lg};
`;

const Form = styled(View)`
  position: relative;
`;

const RightText = styled.View`
  align-items: flex-end;
  margin-bottom: ${({theme}) => theme.spacing.xlg};
`;

const AccessWithoutAccount = styled.View`
  margin-top: ${({theme}) => theme.spacing.xlg};
  align-items: center;
`;

const Switch = styled.View`
  flex-direction: row;
`;

const OptionCss = css<{isSelected?: boolean}>`
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.white};
  ${({theme, isSelected}) =>
    isSelected &&
    css`
      border-color: ${theme.colors.primary};
    `}

  ${fonts.RubikLight};
`;

const FirstOption = styled(Text)<{isSelected?: boolean}>`
  ${({theme}) => css`
    padding: 0 ${theme.spacing.xs} ${theme.spacing.xxs} 0;
    ${OptionCss};
  `}
`;

const SecondOption = styled(Text)<{isSelected?: boolean}>`
  ${({theme}) => css`
    padding: 0 0 ${theme.spacing.xxs} ${theme.spacing.xxs};
    ${OptionCss};
  `}
`;
