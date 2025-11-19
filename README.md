# TanStack-Query (React-Query) 학습 기록

## Dev Tools

- ### 사용 이점

  - 쿼리 캐시가 어떻게 남아 있는지, 어느 시점에 refetch 또는 삭제되는지 확인

  - 에러와 재시도, 로딩 과정을 실시간 디버깅

  - 쿼리 옵션 (staleTime, gcTime 등)에 따른 데이터 생명주기를 시각적으로 검증

  - 쿼리 무효화/삭제/강제 refetch 등 테스트를 UI로 손쉽게 조작

  - 개발/디버깅 효율 극대화, 눈으로 보며 서버 상태 변화를 즉각 확인할 수 있어, 원인 추적 및 최적화가 빠름

## useQuery

- ### enable

  > mount 이후 최초로 데이터를 fetching 할지 여부 판단.
  >
  > 특정 버튼과 같은 상호작용을 통해서만 데이터를 fetching 해야할 때
  >
  > enabled (true/false) 값을 수동으로 적용.
  >
  > 또한 초기 값을 false로 설정하여 특정 권한을 요구하는 fetch의 초기 실행을 막을 수 있음. (네트워크 비용 절약)
  >
  > enabled의 default 값은 true.

- ### retry & retryDelay

  > retry: fetching 실패시 몇번 재시도 할 것인지. (default: 3회)
  >
  > retryDelay: retry를 몇초 ms의 단위로 시도할 것인지. (default: 1초)
  >
  > 사용자의 불안정한 인터넷 연결 상태에서 retry를 통해 데이터 제공.

- ### staleTime

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

- ### gcTime (Garbage Collection Time)

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
