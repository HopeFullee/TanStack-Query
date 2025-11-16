# TanStack-Query (React-Query) 학습 기록

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
