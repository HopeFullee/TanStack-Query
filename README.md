# TanStack-Query (React-Query) & TanStack-Form 학습 정리

## TanStack-Query

- ### Dev Tools

  - #### 사용 이점

    - 쿼리 캐시가 어떻게 남아 있는지, 어느 시점에 refetch 또는 삭제되는지 확인

    - 에러와 재시도, 로딩 과정을 실시간 디버깅

    - 쿼리 옵션 (staleTime, gcTime 등)에 따른 데이터 생명주기를 시각적으로 검증

    - 쿼리 무효화/삭제/강제 refetch 등 테스트를 UI로 손쉽게 조작

    - 개발/디버깅 효율 극대화: 눈으로 보며 서버 상태 변화를 즉각 확인할 수 있어, 원인 추적 및 최적화가 빠름

- ### useQuery

  - #### enable

    > mount 이후 최초로 데이터를 fetching 할지 여부 판단.
    >
    > 특정 버튼과 같은 상호작용을 통해서만 데이터를 fetching 해야할 때
    >
    > enabled (true/false) 값을 수동으로 적용.
    >
    > 또한 초기 값을 false로 설정하여 특정 권한을 요구하는 fetch의 초기 실행을 막을 수 있음. (네트워크 비용 절약)
    >
    > enabled의 default 값은 true.

  - #### retry & retryDelay

    > retry: fetching 실패시 몇번 재시도 할 것인지. (default: 3회)
    >
    > retryDelay: retry를 몇초 ms의 단위로 시도할 것인지. (default: 1초)
    >
    > 사용자의 불안정한 인터넷 연결 상태에서 retry를 통해 데이터 제공.

  - #### staleTime

    > 데이터가 신선하지 아닌지를 관리.
    >
    > staleTime 범위의 신선한 data이면 네트워크 요청없이 caching data를 재사용.
    >
    > staleTime 범위를 초과한 상한 data이면 refetch를 통해 신선한 data를 불러온다.
    >
    > staleTIme의 default 값은 0초.

    - #### staleTime을 길게 잡는 경우

      - 변경이 드문 데이터 (예: 코드 목록, 설정값 등)

      - 네트워크 트래픽을 줄이고 싶을 때

    - #### staleTime을 짧게 잡는 경우

      - 실시간성이 중요한 데이터 (예: 주식, 채팅, 알림 등)

      - 항상 최신 데이터가 필요할 때

  - #### gcTime (Garbage Collection Time)

    > 메모리에 남아있을지 삭제할지를 관리
    >
    > 데이터가 캐시에서 삭제되기까지 걸리는 시간
    >
    > gcTime의 default 값은 5분.

    - #### gcTime을 길게 잡는 경우

      - 자주 재사용되는 데이터

      - 화면 전환이 많고, 빠른 렌더링이 중요한 경우

      - staleTime과 동일하거나 더 길게 설정하는 것이 일반적

    - #### gcTime을 짧게 잡는 경우

      - 메모리 사용을 최소화하고 싶을 때

      - 불필요한 데이터가 메모리에 오래 남지 않게 하고 싶을 때

- ### useMutation

  > CRUD의 R을 제외한 Create, Update, Delete 등을 수행함
  >
  > 일반 "fetch" 또는 "axios"와 비교했을때 mutate는 onSuccess, onError, onSettled 등의 메소드를 제공한다.
  >
  > onError 메소드를 활용해 try catch의 catch(err)를 수행한다.
  >
  > onSettled 메소드를 활용해 try catch의 finally를 수행한다.

## TanStack-Form (폼관리)

> React-Hook-Form 놔두고 TanStack-Form을 써야할 이유가 무엇이 있을까?
>
> RHF은 태생이 JS 기반이지만, TSF는 TS기반으로 제작되어 타입 안정성이 훨신 우월하다고 한다.
>
> 이외 여러 이유가 있겠지만, 본인이 가장 인상깊게 본 부분은 "필드의 분리"에 있다.
>
> 이전 RHF를 사용하며 각 인풋 필드를 개별 컴포넌트로 분리 ->
>
> 더 나아가 해당 컴포넌트 속에서 Label, Input, ErrorMessage 등의 컴포넌트를 분리하는 과정에서
>
> RHF의 필드 값이 올바르게 최상위 부모층에 전달되지 못하는 "버그?"를 경험한 바가 있다.
>
> 당시엔 RHF에 대한 이해가 부족하여 자책하며 넘어갔지만, 현재 RHF와 TSF를 비교해보니
>
> RHF는 구조적으로 하위 children의 깊이 (depth)가 깊어질수록 필드 값을 전달하는 과정에 문제가 생길 수 있다는 것을 알게 되었다.
>
> (그냥 그렇다 하니 수긍한 것이지, 정확한 이유는 모름. 추가 학습 필요 ㅠㅠ)
>
> TLDR;
>
> RHF 보다 TSF가 각 필드의 컴포넌트 분리가 더 안정적으로 돌아간다고 한다.
>
> 본인은 최대한 모든 필드를 컴포넌트 단위로 토막 내는 것을 선호하기 때문에 TSF 학습에 관심이 생겼다.

- ### 일반 `form.Field` vs `createFormHook + createFormHookContext` 차이점

  | 비교항목               | `form.Field`(일반 방식)                   | `createFormHook` 방식                                           |
  | ---------------------- | ----------------------------------------- | --------------------------------------------------------------- |
  | **필드 접근 방식**     | `<form.Field name="...">`                 | `const { Field } = usePostForm()` → `<Field name="...">`        |
  | **폼 객체 접근**       | 반드시 `useForm`로 만든 form 객체 필요    | Hook으로 form 인스턴스를 캡슐화하여 어디서든 동일 접근          |
  | **확장성 / 모듈화**    | 필드 컴포넌트 분리가 까다롭다.            | 필드들을 독립 컴포넌트로 분리하기 매우 용이                     |
  | **Context 처리**       | `<Form form={form}>` 내부에서만 사용 가능 | `createFormHookContext` 통해 컴포넌트 트리 어디에서도 사용 가능 |
  | **코드 재사용성**      | 복잡한 Form에서 반복되는 boilerplate 많음 | 재사용 Hook 기반으로 form + field 로직 자동 캡슐화              |
  | **대규모 Form**        | 상태 관리가 페이지 단일 파일로 커짐       | 훅 + 컨텍스트 조합으로 대형 Form 구조화에 최적                  |
  | **server action 연동** | 직접 submit 관리                          | `form.handleSubmit`만 넣으면 바로 사용 가능                     |
  | **타입 안정성**        | generic 많이 필요                         | Hook에 type 넣으면 전역으로 타입 연결됨                         |
