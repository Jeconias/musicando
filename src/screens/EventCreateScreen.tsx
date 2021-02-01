import {yupResolver} from '@hookform/resolvers/yup';
import React, {useCallback, useEffect, useState} from 'react';
import styled, {css} from 'styled-components/native';
import {SafeAreaView} from '~/components/common';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import useNavigate from '~/hooks/useNavigate';
import * as yup from 'yup';
import {ENVIRONMENT} from '~/config/constants';
import {Controller, useForm} from 'react-hook-form';
import FormGroup from '~/components/Form/FormGroup';
import useTheme from '~/hooks/useTheme';
import DateTimePicker, {
  WindowsDatePickerChangeEvent,
} from '@react-native-community/datetimepicker';
import {format} from '~/utils/date';
import {Keyboard} from 'react-native';
import ButtonNormal from '~/components/Button/ButtonNormal';
import Loading from '~/components/Loading/Loading';
import {MaskService, TextInputMask} from 'react-native-masked-text';
import {ScrollView} from 'react-native-gesture-handler';
import useFeedback from '~/hooks/useFeedback';
import {addDays} from 'date-fns/esm';
import {capitalizeByIndex} from '~/utils/string';
import useReduxDispatch from '~/hooks/useReduxDispatch';
import {eventCreateAsyncThunk} from '~/core/store/actions/event';
import useReduxSelector from '~/hooks/useReduxSelector';
import {addEvent} from '~/core/store/actions/user';

const today = new Date();

interface FormData {
  title: string;
  description: string;
  valueRef: number;
  address: string;
  date?: Date;
  hour?: Date;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .min(1, 'O título deve conter no mínimo 1 caractere.')
    .max(50, 'O título deve conter no máximo 50 caracteres.')
    .required('Informação obrigatória.'),
  description: yup
    .string()
    .min(1, 'A descrição deve conter no mínimo 1 caractere.')
    .max(200, 'A descrição deve conter no máximo 200 caracteres.')
    .required('Informação obrigatória.'),
  valueRef: yup
    .number()
    .max(1000000, 'O máximo deve ser R$ 10.000,00')
    .min(1, 'O mínimo deve ser R$ 1')
    .required('Informação obrigatória.'),
  address: yup
    .string()
    .min(1, 'O endereço deve conter no mínimo 1 caractere.')
    .max(100, 'A endereço deve conter no máximo 100 caracteres.')
    .required('Informação obrigatória.'),
  date: yup
    .date()
    .test(
      'tomorrow',
      'A data do evento deve ser superior ao dia atual.',
      (value) => !!value && value > today,
    ),
  hour: yup.date().required('O horário é obrigatório.'),
});

const defaultValues: FormData = ENVIRONMENT.isDev
  ? {
      title: 'Evento de Teste',
      description: 'Descrição do evento de teste.',
      valueRef: 17.08,
      address: 'Endereço de teste, 375',
      date: addDays(today, 1),
      hour: today,
    }
  : {
      title: '',
      description: '',
      valueRef: 0,
      address: '',
      date: undefined,
      hour: undefined,
    };

const EventCreateScreen = () => {
  const dispatch = useReduxDispatch();
  const {theme} = useTheme();
  const {goBack} = useNavigate();
  const {feedback} = useFeedback();

  const loading = useReduxSelector((state) => state.event.create.loading);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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

  const {date, hour} = watch();

  const handleDatePicker = useCallback(
    (_: WindowsDatePickerChangeEvent, dateTime?: Date) => {
      if (showDatePicker) {
        setValue('date', dateTime, {shouldValidate: true});
        setShowDatePicker(false);
        setShowTimePicker(true);
      } else if (showTimePicker) {
        setValue('hour', dateTime, {shouldValidate: true});
        setShowTimePicker(false);
      }
    },
    [
      setValue,
      showDatePicker,
      setShowDatePicker,
      showTimePicker,
      setShowTimePicker,
    ],
  );

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!data.date || !data.hour) return;
      const date = `${format(data.date, 'yyyy-MM-dd')} ${format(
        data.hour,
        'HH:mm:00',
      )}`;

      const resp = await dispatch(
        eventCreateAsyncThunk({
          title: data.title,
          description: data.description,
          address: data.address,
          valueRef: data.valueRef.toString(),
          date: date,
        }),
      );

      if (eventCreateAsyncThunk.fulfilled.match(resp)) {
        feedback({
          message: 'Evento cadastro com sucesso.',
          type: 'success',
        });
        reset(defaultValues);
        dispatch(
          addEvent({
            uuid: resp.payload.data.uuidEvent,
            title: data.title,
            description: data.description,
            address: data.address,
            value_ref: data.valueRef,
            date: date,
          }),
        );
        goBack();
      }
    },
    [feedback, dispatch, reset, goBack],
  );

  const isLoading = loading === 'loading';
  const hasError = !!Object.keys(errors).length;

  useEffect(() => {
    register('date');
    register('hour');
  }, [register]);

  return (
    <SafeAreaView>
      <ContainerWithHeader
        iconLeft={{
          icon: 'arrowLeft',
          backgroundColor: 'backgroundBlackSupport',
          onPress: goBack,
        }}
        title="Novo Evento">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Form>
            <Image source={require('../assets/imgs/profiles/default.jpg')} />
            <Controller
              name="title"
              control={control}
              render={({onChange, onBlur, value}) => (
                <FormGroup
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="Título"
                  placeholderTextColor={theme.colors.text}
                  keyboardType="default"
                  icon="eventSimple"
                  error={errors?.title?.message}
                  editable={!isLoading}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({onChange, onBlur, value}) => (
                <FormGroup
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="Descrição"
                  placeholderTextColor={theme.colors.text}
                  keyboardType="default"
                  multiline={true}
                  icon="comment"
                  error={errors?.description?.message}
                  editable={!isLoading}
                />
              )}
            />
            <Controller
              name="valueRef"
              control={control}
              render={({onChange, onBlur, value}) => (
                <FormGroup
                  tag={TextInputMask}
                  inputMaskProps={{
                    type: 'money',
                    onChangeText: (value) =>
                      onChange(MaskService.toRawValue('money', value ?? '')),
                  }}
                  onBlur={onBlur}
                  value={MaskService.toMask('money', value ?? '')}
                  placeholder="Quanto está disposto a pagar?"
                  placeholderTextColor={theme.colors.text}
                  keyboardType="numeric"
                  icon="money"
                  error={errors?.valueRef?.message}
                  editable={!isLoading}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({onChange, onBlur, value}) => (
                <FormGroup
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="Aonde acontecerá o evento?"
                  placeholderTextColor={theme.colors.text}
                  keyboardType="default"
                  icon="locationBig"
                  error={errors?.address?.message}
                  editable={!isLoading}
                />
              )}
            />

            <FormGroup
              value={`${capitalizeByIndex(
                format(date ?? today, 'dd MMMM yyyy'),
                3,
              )} às ${format(hour ?? today, 'HH:mm')}`}
              onFocus={() => {
                Keyboard.dismiss();
                setShowDatePicker(true);
              }}
              placeholder="Quando acontecerá o evento?"
              placeholderTextColor={theme.colors.text}
              showSoftInputOnFocus={false}
              icon="calendar"
              error={errors?.date?.message}
              editable={!isLoading}
            />

            <CustomButtonNormal
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading || hasError}>
              {isLoading ? <Loading /> : 'Criar Evento'}
            </CustomButtonNormal>

            {(showDatePicker || showTimePicker) && (
              <DateTimePicker
                value={today}
                mode={showDatePicker ? 'date' : 'time'}
                is24Hour={true}
                display="default"
                onChange={handleDatePicker as any}
                minimumDate={addDays(today, 1)}
              />
            )}
          </Form>
        </ScrollView>
      </ContainerWithHeader>
    </SafeAreaView>
  );
};

export default EventCreateScreen;

const Form = styled.View`
  ${({theme}) => css`
    padding-bottom: ${theme.spacing.xlg};
  `}
`;

const CustomButtonNormal = styled(ButtonNormal)`
  ${({theme}) => css`
    margin-top: ${theme.spacing.lg};
  `}
`;

const Image = styled.Image`
  ${({theme}) => css`
    width: 100%;
    height: ${Math.ceil((17 / 100) * theme.device.dimensions.window.height)}px;
    margin-bottom: ${theme.spacing.sm};
    border-radius: 5px;
  `}
`;
