import styled from 'styled-components';

type IFilterProps = {
  icon?: any;
  label: string;
  count?: number | string | any;
  isActive?: boolean;
  onClick?: () => void;
};

export const FilterPropertyWrapper = styled.div`
  background: ${(props: { isActive: boolean }) => (props.isActive ? '#5C95FF' : '#373943')};
  width: max-content;

  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  gap: 3px;
  text-transform: capitalize;
  font-size: small;
  align-items: center;
  padding: 5px 20px;
  cursor: pointer;
  transition: all 0.3s ease-in;
  color: rgba(255, 255, 255, 0.5);
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  .icon {
    font-size: 0.8rem;
    display: flex;
    margin-right: 5px;
  }
  .count {
    margin-left: 5px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    margin-top: 1px;
  }
`;

const FilterProperty = ({ icon, label, count, isActive, onClick }: IFilterProps) => {
  return (
    <>
      <FilterPropertyWrapper onClick={onClick} isActive={isActive}>
        <span className="icon">{icon}</span>
        <span>{label}</span>
        <span className="count">{count}</span>
      </FilterPropertyWrapper>
    </>
  );
};

export default FilterProperty;
